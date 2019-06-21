#!/bin/sh

cp .githooks/pre-commit .git/hooks/pre-commit
cp .githooks/pre-commit.py .git/hooks/pre-commit.py

chmod 755 .git/hooks/pre-commit
chmod 755 .git/hooks/pre-commit.py
