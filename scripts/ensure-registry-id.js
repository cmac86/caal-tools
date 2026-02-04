#!/usr/bin/env node

/**
 * Ensure Registry ID - Auto-adds registry IDs and tracking stickies to tools
 *
 * Runs on push to main (after merge). Two independent checks:
 * 1. Missing registry ID in manifest.json → generate and add
 * 2. Missing tracking sticky in workflow.json → add (even if ID already exists)
 *
 * Usage:
 *   node ensure-registry-id.js                          # Scan all tools (backfill)
 *   node ensure-registry-id.js --changed "file1 file2"  # Only check changed files
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const toolsDir = './tools';

function generateRegistryId() {
  return crypto.randomBytes(16).toString('base64url');
}

function generateUUID() {
  return crypto.randomUUID();
}

function createRegistryStickyNote(registryId, version, toolName, description, category) {
  const link = `https://github.com/CoreWorxLab/caal-tools/tree/main/tools/${category}/${toolName}`;

  const content = `## CAAL Registry Tracking
**Tool Name:** ${toolName}
**Description:** ${description}
**version:** v${version}
**id:** ${registryId}
**link:** [Registry](${link})

### (Do not delete this sticky)`;

  return {
    parameters: {
      content,
      height: 260,
      width: 360,
    },
    type: 'n8n-nodes-base.stickyNote',
    position: [-784, -288],
    typeVersion: 1,
    id: generateUUID(),
    name: 'Registry Tracking',
  };
}

function processToolDirectory(toolPath) {
  const manifestPath = path.join(toolPath, 'manifest.json');
  const workflowPath = path.join(toolPath, 'workflow.json');

  if (!fs.existsSync(manifestPath)) {
    console.log(`  Skipping ${toolPath} - no manifest.json`);
    return false;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    console.warn(`  Skipping ${toolPath} - invalid manifest.json: ${e.message}`);
    return false;
  }

  const pathParts = toolPath.split(path.sep);
  const category = pathParts[pathParts.indexOf('tools') + 1] || 'other';
  const toolName = manifest.name || pathParts[pathParts.length - 1];

  let changed = false;

  // Check 1: Missing registry ID
  if (!manifest.id) {
    const newId = generateRegistryId();
    manifest.id = newId;
    if (!manifest.version) {
      manifest.version = '1.0.0';
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`  ${toolName} - added registry ID: ${newId}`);
    changed = true;
  }

  // Check 2: Missing tracking sticky (independent of ID check)
  if (manifest.id && fs.existsSync(workflowPath)) {
    try {
      const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

      const hasSticky = workflow.nodes?.some(
        (n) =>
          n.type === 'n8n-nodes-base.stickyNote' &&
          n.parameters?.content?.includes('CAAL Registry Tracking')
      );

      if (!hasSticky) {
        const stickyNote = createRegistryStickyNote(
          manifest.id,
          manifest.version || '1.0.0',
          toolName,
          manifest.description || '',
          category
        );

        if (!workflow.nodes) {
          workflow.nodes = [];
        }
        workflow.nodes.push(stickyNote);

        fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2) + '\n');
        console.log(`  ${toolName} - added registry tracking sticky note`);
        changed = true;
      }
    } catch (e) {
      console.warn(`  Could not update workflow.json: ${e.message}`);
    }
  }

  if (!changed) {
    console.log(`  ${toolName} - OK (id: ${manifest.id})`);
  }

  return changed;
}

// Parse arguments
const args = process.argv.slice(2);
const changedIndex = args.indexOf('--changed');
const changedFiles = changedIndex !== -1 ? args[changedIndex + 1] : null;

console.log('Checking for missing registry IDs and tracking stickies...\n');

let updated = 0;

if (changedFiles) {
  const files = changedFiles.split(/\s+/).filter((f) => f.trim());

  if (files.length === 0) {
    console.log('No tool files changed.');
  } else {
    const toolDirs = new Set();
    for (const file of files) {
      const match = file.match(/^(tools\/[^/]+\/[^/]+)\//);
      if (match) {
        toolDirs.add(match[1]);
      }
    }

    for (const toolPath of toolDirs) {
      if (fs.existsSync(toolPath) && fs.statSync(toolPath).isDirectory()) {
        if (processToolDirectory(toolPath)) {
          updated++;
        }
      }
    }
  }
} else {
  const categories = fs.readdirSync(toolsDir);
  for (const category of categories) {
    const categoryPath = path.join(toolsDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const tools = fs.readdirSync(categoryPath);
    for (const tool of tools) {
      const toolPath = path.join(categoryPath, tool);
      if (!fs.statSync(toolPath).isDirectory()) continue;

      if (processToolDirectory(toolPath)) {
        updated++;
      }
    }
  }
}

console.log(`\nDone. Updated ${updated} tool(s).`);
