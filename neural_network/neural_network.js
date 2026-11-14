import { Layer } from "./layer.js"

const sigmoid = (z) => 1 / (1 + Math.exp(-z));

export class NeuralNetwork {
    constructor(num_inputs, num_hidden_nodes, num_outputs, output_activation) {
        this.num_inputs = num_inputs;
        this.num_hidden_nodes = num_hidden_nodes;
        this.num_outputs = num_outputs;
        this.output_activation = output_activation;
        this.hidden_layer = new Layer(num_hidden_nodes, num_inputs, (z) => Math.tanh(z));
        this.output_layer = new Layer(
            num_outputs,
            num_hidden_nodes,
            output_activation === "sigmoid" ? sigmoid : Math.tanh
        )
    }

    forward(input) {
        const hidden_output = this.hidden_layer.forward(input);
        const final_output = this.output_layer.forward(hidden_output);

        return final_output;
    }

    predict(input) {
        const output = this.forward(input);
        return output;
    }

    mutate(mutation, mutation_chance) {
        for (let i = 0; i < this.hidden_layer.weights.length; i++) {
            for (let j = 0; j < this.hidden_layer.weights[i].length; j++) {
                if (Math.random() < mutation_chance) {
                    this.hidden_layer.weights[i][j] += Math.random() * mutation - mutation / 2;
                }
            }
            if (Math.random() < mutation_chance) {
                this.hidden_layer.biases[i] += Math.random() * mutation - mutation / 2;
            }
        }

        for (let i = 0; i < this.output_layer.weights.length; i++) {
            for (let j = 0; j < this.output_layer.weights[i].length; j++) {
                if (Math.random() < mutation_chance ) {
                    this.output_layer.weights[i][j] += Math.random() * mutation - mutation / 2;
                }
            }
            if (Math.random() < mutation_chance) {
                this.output_layer.biases[i] += Math.random() * mutation - mutation / 2;
            }
        }

        return this;
    }

    clone() {
        const copy = new NeuralNetwork(this.num_inputs, this.num_hidden_nodes, this.num_outputs, this.output_activation);

        copy.hidden_layer.weights = structuredClone(this.hidden_layer.weights);
        copy.hidden_layer.biases = structuredClone(this.hidden_layer.biases);
        copy.output_layer.weights = structuredClone(this.output_layer.weights);
        copy.output_layer.biases = structuredClone(this.output_layer.biases);

        return copy
    }
}