import numpy as np
import matplotlib.pyplot as plt

def read_ubyte_images(filename):
    with open(filename, 'rb') as f:
        # Skip the 16-byte header (common for MNIST-style idx3-ubyte files)
        # Header: magic number (4), num images (4), rows (4), cols (4)
        f.read(16) 
        
        # Read the remaining data as unsigned 8-bit integers
        data = np.frombuffer(f.read(), dtype=np.uint8)
        
        # Reshape into (Number of images, Height, Width)
        # For standard MNIST, this is (60000, 28, 28)
        images = data.reshape(-1, 784) / 255
        return images

def read_ubyte_labels(filename):
    with open(filename, 'rb') as f:
        f.read(8)
        labels = np.frombuffer(f.read(), dtype=np.uint8)
    return labels

images = read_ubyte_images('train-images.idx3-ubyte')
print(f"Loaded {len(images)} images.")

print(images[0].shape)

labels = read_ubyte_labels('train-labels.idx1-ubyte')
print(labels[0])

# img_2d = images[0].reshape(28, 28)
# plt.imshow(img_2d, cmap='gray')
# plt.axis('off')  # Hide grid lines and pixel counts
# plt.show()