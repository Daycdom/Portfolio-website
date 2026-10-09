#!/usr/bin/env bash
# Runs once after the devcontainer is created.
# Sets up SSH so git push/pull to GitHub works with no prompts,
# then prints installed language/tool versions as a sanity check.
set -euo pipefail

SSH_DIR="$HOME/.ssh"

echo "== Setting up SSH =="

if [ -d "$SSH_DIR" ]; then
    # The mounted host key files need to be owned by the container user
    # and locked down to the permissions SSH insists on, or it refuses to use them.
    sudo chown -R "$(id -u):$(id -g)" "$SSH_DIR" 2>/dev/null || true
    chmod 700 "$SSH_DIR"
    find "$SSH_DIR" -type f -name "id_*" ! -name "*.pub" -exec chmod 600 {} \;
    find "$SSH_DIR" -type f -name "*.pub" -exec chmod 644 {} \;

    # Pre-trust GitHub's host key so the first git push/pull doesn't stop
    # to ask "are you sure you want to continue connecting?"
    touch "$SSH_DIR/known_hosts"
    chmod 644 "$SSH_DIR/known_hosts"
    if ! ssh-keygen -F github.com -f "$SSH_DIR/known_hosts" > /dev/null 2>&1; then
        ssh-keyscan -H github.com >> "$SSH_DIR/known_hosts" 2>/dev/null || true
    fi

    echo "SSH key(s) found:"
    ls "$SSH_DIR"/*.pub 2>/dev/null || echo "  (no public key found — did the ~/.ssh mount succeed?)"

    echo "Testing GitHub SSH auth:"
    ssh -T git@github.com 2>&1 | tail -n 1 || true
else
    echo "No ~/.ssh directory found in the container — check the mount in devcontainer.json."
fi

echo ""
echo "== Dev container ready. Languages: =="
python3 --version
g++ --version | head -n1
java -version
go version
ruby --version
node --version

echo ""
echo "== Package managers: =="
pip --version
npm --version
mvn --version | head -n1
bundle --version
