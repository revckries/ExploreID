from PIL import Image
import os

# Set the image filename you want to convert (just the filename, not the path)
image_to_convert = "filipe-freitas.jpg"  # Change this to your specific image filename

# Define the folder containing the images
folder_path = "./images"  # Change this to your actual folder path

# Define the output folder for WebP images
output_folder = "./webp_output"  # Change this to your desired output folder path

# Create the output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)
    print(f"Created output directory: {output_folder}")

# Construct the full input path
input_image_path = os.path.join(folder_path, image_to_convert)

# Check if the file exists
if not os.path.exists(input_image_path):
    print(f"Error: The image '{image_to_convert}' does not exist in '{folder_path}'")
else:
    try:
        # Open the image
        image = Image.open(input_image_path)
        
        # Get the base filename without extension
        base_filename = os.path.splitext(image_to_convert)[0]
        
        # Define the output file path in the output folder
        output_image_path = os.path.join(output_folder, base_filename + ".webp")
        
        # Convert and save as WebP
        image.save(output_image_path, "WEBP")
        print(f"Converted: {image_to_convert} -> {os.path.basename(output_image_path)}")
        print(f"Output saved to: {output_image_path}")
    except Exception as e:
        print(f"Error converting {image_to_convert}: {e}")