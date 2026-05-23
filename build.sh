#!/usr/bin/env bash
set -e

echo "Installing setuptools and wheel..."
pip install --upgrade setuptools wheel

echo "Installing requirements..."
pip install -r backend/requirements.txt

echo "Build completed successfully!"
