const randomWeightsRange = 2;
const randomBiasRange = 0;

export class Layer {
    constructor(num_nodes, num_inputs_from_prev_layer, activation) {
        this.weights = []
        this.biases = []
        for (let i = 0; i < num_nodes; i++) {
            const node = []
            for (let j = 0; j < num_inputs_from_prev_layer; j++) {
                node.push(Math.random() * randomWeightsRange - randomWeightsRange/2);
            }
            this.weights.push(node);
            this.biases.push(Math.random() * randomBiasRange - randomBiasRange/2);
        }

        this.activation = activation;
    }

    forward(inputs) {
        const activated = []
        // Run for every node
        for (let i = 0; i < this.weights.length; i++) {
            // Run for every weight on the node
            let weighted_sum = 0;
            for (let j = 0; j < this.weights[i].length; j++) {
                weighted_sum += inputs[j] * this.weights[i][j];
            }
            weighted_sum += this.biases[i];
            activated.push(this.activation(weighted_sum));
        }
            return activated;
    }
}