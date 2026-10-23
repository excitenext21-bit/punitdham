import os
import zipfile

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dist_dir = os.path.join(base_dir, "dist")
zip_path = os.path.join(base_dir, "punitdhan_hostinger_upload.zip")
assets_zip = os.path.join(base_dir, "assets.zip")

print("Building punitdhan_hostinger_upload.zip with strict Unix forward slashes...")

# Remove previous archives
if os.path.exists(zip_path):
    os.remove(zip_path)
if os.path.exists(assets_zip):
    os.remove(assets_zip)

# 1. Full Production ZIP
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            full_path = os.path.join(root, file)
            # CRITICAL: Always use standard Unix forward slashes '/' for Linux web servers
            rel_path = os.path.relpath(full_path, dist_dir).replace("\\", "/")
            zipf.write(full_path, rel_path)

# 2. Lightweight assets-only ZIP
assets_dir = os.path.join(dist_dir, "assets")
if os.path.exists(assets_dir):
    with zipfile.ZipFile(assets_zip, "w", zipfile.ZIP_DEFLATED) as azip:
        for root, dirs, files in os.walk(assets_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = "assets/" + os.path.relpath(full_path, assets_dir).replace("\\", "/")
                azip.write(full_path, rel_path)

full_mb = round(os.path.getsize(zip_path) / (1024 * 1024), 2)
assets_kb = round(os.path.getsize(assets_zip) / 1024, 1)

print(f"SUCCESS: Created full package: {zip_path} ({full_mb} MB)")
print(f"SUCCESS: Created lightweight: {assets_zip} ({assets_kb} KB)")
