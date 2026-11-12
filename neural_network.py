from layer import Layer
import numpy as np
import math
from read_file import read_ubyte_images, read_ubyte_labels

# Feed forward neural network for mnist number classification

class NeuralNetwork:
    def __init__(self):
        self.hidden_layer = Layer(128, 784, lambda z: np.maximum(0, z))
        self.output_layer = Layer(10, 128, lambda z: z)
        
    
    def forward(self, input):
        hidden_output = self.hidden_layer.forward(input)
        final_output = self.output_layer.forward(hidden_output)

        return final_output

    def predict(self, inputs):
        outputs = []
        for input in inputs:
            outputs.append(np.argmax(self.forward(input)))
        return outputs
    
    def cost(self, input, correct_output):
        output = self.forward(input)
        cost = (1 / 2) * np.sum((output - correct_output) ** 2)

        return cost

    def average_cost(self, inputs, correct_outputs):
        total_cost = 0
        for input, correct_output in zip(inputs, correct_outputs):
            total_cost += self.cost(input, correct_output)
        average_cost = total_cost / len(inputs)
        return average_cost

    def train(self, input, correct_output, learn_rate):
        h = .00001
        original_cost = self.cost(input, correct_output)

        for i in range(len(self.hidden_layer.weights)):
            for j in range(len(self.hidden_layer.weights[i])):
                self.hidden_layer.weights[i, j] += h
                delta_cost = self.cost(input, correct_output) - original_cost
                self.hidden_layer.weights[i, j] -= h
                self.hidden_layer.costGradientW[i, j] = delta_cost / h

        for i in range(len(self.hidden_layer.biases)):
            self.hidden_layer.biases[i] += h
            delta_cost = self.cost(input, correct_output) - original_cost
            self.hidden_layer.biases[i] -= h
            self.hidden_layer.costGradientB[i] = delta_cost / h

        # Partial Derivative
        for i in range(len(self.output_layer.weights)):
            for j in range(len(self.output_layer.weights[i])):
                self.output_layer.costGradientW[i, j] = self.cost_gradient(input, correct_output)
        # End test
        # for i in range(len(self.output_layer.weights)):
        #     for j in range(len(self.output_layer.weights[i])):
        #         self.output_layer.weights[i, j] += h
        #         delta_cost = self.cost(input, correct_output) - original_cost
        #         self.output_layer.weights[i, j] -= h
        #         self.output_layer.costGradientW[i, j] = delta_cost / h

        for i in range(len(self.output_layer.biases)):
            self.output_layer.biases[i] += h
            delta_cost = self.cost(input, correct_output) - original_cost
            self.output_layer.biases[i] -= h
            self.output_layer.costGradientB[i] = delta_cost / h

        self.hidden_layer.apply_gradients(learn_rate)
        self.output_layer.apply_gradients(learn_rate)

    def learn(self, inputs, correct_outputs, learn_rate):
        for input, correct_output in zip(inputs, correct_outputs):
            self.train(input, correct_output, learn_rate)

images = read_ubyte_images('train-images.idx3-ubyte')
labels = read_ubyte_labels('train-labels.idx1-ubyte')

nn = NeuralNetwork()

def one_hot(labels):
    targets = []
    for label in labels:
        target = np.zeros(10)
        target[label] = 1
        targets.append(target)
    return np.array(targets)
    
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
nn.learn(images[:5], one_hot(labels[:5]), .002)
nn.learn(images[:5], one_hot(labels[:5]), .002)
print(nn.predict(images[:5]))
print(nn.average_cost(images[:5], one_hot(labels[:5])))
print(labels[:5])