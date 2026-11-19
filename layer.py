import random
import numpy as np

class Layer:
    def __init__(self, num_nodes, num_inputs_from_prev_layer, activation):
        self.weights = np.array([
            np.array([random.uniform(-.1, .1) for _ in range(num_inputs_from_prev_layer)])
            for _ in range(num_nodes)
        ])
        self.biases = np.zeros(num_nodes)
        self.activations = None
        self.raw_output = None

        self.costGradientW = np.zeros((num_nodes, num_inputs_from_prev_layer))
        self.costGradientB = np.zeros(num_nodes)
        self.activation = activation

    def apply_gradients(self, learn_rate):
        self.weights -= self.costGradientW * learn_rate
        self.biases -= self.costGradientB * learn_rate

    def forward(self, inputs):
        z = self.weights @ inputs + self.biases
        activated_z = self.activation(z)
        self.raw_output = z
        self.activations = activated_z
        return activated_z
