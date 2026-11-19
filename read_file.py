import numpy as np
import matplotlib.pyplot as plt
from neural_network import NeuralNetwork
import time

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

nn = NeuralNetwork()

images_train = read_ubyte_images('train-images.idx3-ubyte')
labels_train = read_ubyte_labels('train-labels.idx1-ubyte')
images_test = read_ubyte_images('t10k-images-idx3-ubyte')
labels_test = read_ubyte_labels('t10k-labels-idx1-ubyte')

def one_hot(label, num_classes=10):
    vector = np.zeros(num_classes)
    vector[label] = 1
    return vector

num_images = 60000

def evaluate(nn, images_test, labels_test, start, count):
    total = 0
    correct = 0
    for i in range(start, count):
        output = nn.forward(images_test[i])
        total += 0.5 * np.sum((output - one_hot(labels_test[i])) ** 2)
        correct += np.argmax(output) == labels_test[i]
    return total / count, correct / count

labels_onehot = np.array([one_hot(l) for l in labels_train[:num_images]])

start_time = time.time()
cost, acc = evaluate(nn, images_test, labels_test, 0, 10000)
print(f"Cost: {cost:.4f}  Accuracy: {acc:.1%}")
learning_rate = .01
for epoch in range(15):
    order = np.random.permutation(len(images_train))
    nn.learn(images_train[order], labels_onehot[order], learning_rate)
    cost, acc = evaluate(nn, images_test, labels_test, 0, len(images_test))
    print(f"Epoch {epoch+1}: cost {cost:.4f}  accuracy {acc:.1%}")
    learning_rate = learning_rate * .9
cost, acc = evaluate(nn, images_test, labels_test, 0, 10000)
print(f"Cost: {cost:.4f}  Accuracy: {acc:.1%}")
print(f"Time: {time.time() - start_time}")


# img_2d = images[0].reshape(28, 28)
# plt.imshow(img_2d, cmap='gray')
# plt.axis('off')  # Hide grid lines and pixel counts
# plt.show()