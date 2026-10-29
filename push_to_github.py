"""
Push AI Skill Gap Detector to GitHub using Dulwich Git Engine
"""

import sys
import getpass
from dulwich.repo import Repo
import dulwich.porcelain as porcelain

REPO_URL = "https://github.com/harshalpatilhp08-hash/AI-SKILL-GAP-DETECTOR.git"

def main():
    token = None
    if len(sys.argv) > 1:
        token = sys.argv[1].strip()

    if not token:
        print("=" * 60)
        print("  PUSH AI SKILL GAP DETECTOR TO GITHUB")
        print("=" * 60)
        print("Target: https://github.com/harshalpatilhp08-hash/AI-SKILL-GAP-DETECTOR")
        print("\nPlease paste your GitHub Personal Access Token (PAT):")
        print("(Generate token at: https://github.com/settings/tokens with 'repo' scope)")
        try:
            token = input("GitHub Token: ").strip()
        except EOFError:
            pass

    if not token:
        print("Error: No GitHub token provided.")
        sys.exit(1)

    auth_url = f"https://harshalpatilhp08-hash:{token}@github.com/harshalpatilhp08-hash/AI-SKILL-GAP-DETECTOR.git"

    repo = Repo('.')
    print("\nPushing 'main' branch to GitHub...")
    try:
        porcelain.push(repo, auth_url, "refs/heads/main")
        print("\n" + "=" * 60)
        print("  SUCCESSFULLY PUSHED TO GITHUB!")
        print("=" * 60)
        print("Repository: https://github.com/harshalpatilhp08-hash/AI-SKILL-GAP-DETECTOR")
        print("Universal Live Link: https://harshalpatilhp08-hash.github.io/AI-SKILL-GAP-DETECTOR/")
        print("=" * 60)
    except Exception as e:
        print(f"Error during push: {e}")

if __name__ == "__main__":
    main()
