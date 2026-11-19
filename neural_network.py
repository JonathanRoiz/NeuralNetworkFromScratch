from layer import Layer
import numpy as np
import math

# Feed forward neural network for mnist number classification

class NeuralNetwork:
    def __init__(self):
        self.hidden_layer = Layer(128, 784, lambda z: np.maximum(0, z))
        self.output_layer = Layer(10, 128, lambda z: z)
        
    
    def forward(self, input):
        hidden_output = self.hidden_layer.forward(input)
        final_output = self.output_layer.forward(hidden_output)

        return final_output
    
    def cost(self, input, correct_output):
        output = self.forward(input)
        cost = 1/2 * np.sum((output - correct_output) ** 2)

        return cost

    def average_cost(self, inputs, correct_outputs):
        total_cost = 0
        for input, correct_output in zip(inputs, correct_outputs):
            total_cost += self.cost(input, correct_output)
        average_cost = total_cost / len(inputs)
        return average_cost

    def train(self, input, correct_output, learn_rate):
        output_activation = self.forward(input)

        cost_derivative = output_activation - correct_output
        output_activation_derivative = np.ones(len(self.output_layer.weights))
        cost_derivatives_with_respect_to_output = cost_derivative*output_activation_derivative
        self.output_layer.costGradientW = np.outer(cost_derivatives_with_respect_to_output, self.hidden_layer.activations)

        self.output_layer.costGradientB = cost_derivatives_with_respect_to_output

        cost_derivative_sums = self.output_layer.weights.T @ cost_derivatives_with_respect_to_output
        relu_derivatives = (self.hidden_layer.raw_output >= 0).astype(float)
        hidden_delta = relu_derivatives * cost_derivative_sums
        
        self.hidden_layer.costGradientB = hidden_delta
        self.hidden_layer.costGradientW = np.outer(hidden_delta, input)

        self.hidden_layer.apply_gradients(learn_rate)
        self.output_layer.apply_gradients(learn_rate)

    def learn(self, inputs, correct_outputs, learn_rate):
        for input, correct_output in zip(inputs, correct_outputs):
            self.train(input, correct_output, learn_rate)