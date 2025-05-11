from PIL import Image
import os

# Define the folder containing the images
folder_path = "./images"  # Change this to your actual folder path

# Define the output folder for WebP images
output_folder = "./webp_output"  # Change this to your desired output folder path

# Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)
    print(f"Created output directory: {output_folder}")

# Supported image extensions
supported_extensions = [".png", ".jpg", ".jpeg"]

# Loop through all files in the folder
for filename in os.listdir(folder_path):
    file_lower = filename.lower()
    if any(file_lower.endswith(ext) for ext in supported_extensions):
        input_image_path = os.path.join(folder_path, filename)
        
        # Open the image
        image = Image.open(input_image_path)
        
        # Get the base filename without extension
        base_filename = os.path.splitext(filename)[0]
        
        # Define the output file path in the new output folder
        output_image_path = os.path.join(output_folder, base_filename + ".webp")
        
        # Convert and save as WebP
        image.save(output_image_path, "WEBP")
        print(f"Converted: {filename} -> {os.path.basename(output_image_path)}")

print(f"All conversions completed. WebP files saved to: {output_folder}")