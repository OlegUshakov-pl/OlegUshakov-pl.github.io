import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';

const server = createServer(async (req, res) => {
  // Enable CORS for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Only accept POST requests to /commit
  if (req.method === 'POST' && req.url === '/commit') {
    try {
      // Read request body
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }

      const { message } = JSON.parse(body);
      
      if (!message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Commit message is required' }));
        return;
      }

      // Git add -A
      execFileSync('git', ['add', '-A'], { stdio: 'pipe' });

      // Check if there are changes
      const diffOutput = execFileSync('git', ['diff', '--cached', '--name-only'], { encoding: 'utf-8' });
      
      if (!diffOutput.trim()) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, changed: false }));
        return;
      }

      // Commit with message
      execFileSync('git', ['commit', '-m', message], { stdio: 'pipe' });

      // Push
      execFileSync('git', ['push'], { stdio: 'pipe' });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, changed: true }));
    } catch (error) {
      console.error('Git operation failed:', error.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: error.message }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'Not found' }));
  }
});

const PORT = 4001;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Git commit server running at http://127.0.0.1:${PORT}`);
});
