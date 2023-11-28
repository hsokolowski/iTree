# ITree: Interactive Decision-Making with Classification Trees

## Introduction

ITree is an innovative web tool designed to facilitate interactive decision-making using classification trees. This intuitive platform supports manual, semi-automatic, and automatic induction of decision trees, catering to both educational and professional needs in the biomedical field. ITree stands out with its ability to allow users to manually modify tree structures, apply various splitting algorithms, and instantly view the impact of these changes on prediction models and testing datasets. Whether you're a researcher, educator, or someone passionate about decision tree induction, ITree offers a versatile, user-driven experience. The full working application can be accessed and tested at [https://itree.wi.pb.edu.pl](https://itree.wi.pb.edu.pl).

## Table of Contents

1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Usage](#usage)
4. [Technical Details](#technical-details)
5. [Contributing](#contributing)
6. [Authors and Acknowledgment](#authors-and-acknowledgment)
7. [License](#license)
8. [References and Links](#references-and-links)
9. [Appendix/FAQ](#appendixfaq)

## Installation and Setup

### Prerequisites

Before installing ITree, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/en/download/)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the Repository**
2. **Navigate to the Project Directory**
3. **Install Dependencies**

### Starting the App

- To run the app in the development mode, use:
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

ITree is an interactive web-based platform that facilitates the induction and manipulation of decision trees using a user-provided dataset. Here's how to harness the full potential of ITree's features:

### Initial Configuration

- **File Upload**: Start by uploading your dataset in a CSV format.
- **Algorithm Selection**: Choose from algorithms like C4.5, TSP, or WTSP for node splitting.
- **Decision Attribute Configuration**: Select the attribute that will be used for classification.
- **Parameter Settings**: Configure essential settings such as minimum node size, maximum tree depth, and entropy threshold.
- **Draw Tree**: With your settings in place, click 'Draw' to generate your initial decision tree.

### Interactive Decision Tree Viewer

- **Training and Testing Data View**: The main view displays the decision tree generated from your training set. You can upload a testing set to evaluate the prediction model's performance.
- **Tree Node Interaction**: Click on any node to fold or unfold branches, allowing for manual pruning or expansion.
- **Statistics and Metrics**: View real-time updates on accuracy and confusion matrix as you interact with the tree.

### Manual Adjustments and Tests

- **Node Modification**: Directly adjust the splits in your decision tree by selecting nodes and choosing alternative split strategies.
- **Test Selection**: For each node, you can pick among different tests, like C4.5, TSP, or WTSP, to determine how to best split your data.

### Real-time Data Analysis

- **Confusion Matrix**: Access the confusion matrix from the interface to understand the accuracy of your tree.
- **Data Viewer**: Inspect the distribution of your data and the classification results within the nodes of your decision tree.

### Experimentation and Learning

- **Interactive Learning**: ITree serves as an educational tool, allowing users to experiment with different decision tree configurations and learn about their effects on data classification.

## Technical Details

### Code Organization

- The ITree codebase is structured to facilitate easy navigation and understanding. Key components are organized in separate directories.

### Available Scripts

- **`npm start`**: Runs the app in development mode. Access it at [http://localhost:3000](http://localhost:3000).
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder. It optimizes the build for performance.
- **`npm run eject`**: Removes the single build dependency from your project, copying all configuration files and transitive dependencies into your project.

### Dependencies

- ITree utilizes several key libraries and frameworks, including React. The detailed list of dependencies can be found in the `package.json` file.

## Contributing

We warmly welcome contributions to the ITree project. Whether it's feature requests, bug reports, or code contributions, here's how you can contribute:

### Guidelines

- **Reporting Issues**: Please use the GitHub issue tracker to report bugs or suggest features.
- **Submitting Pull Requests**: For code contributions, please fork the repository and use a new branch for your work. Pull requests are eagerly awaited.

### Contact Info

- For major changes or discussions in context of research/development please contact [m.czajkowski@pb.edu.pl](mailto:m.czajkowski@pb.edu.pl).
- For major changes or discussions in context of software please contact [hubert.sokool@gmail.com ](mailto:hubert.sokool@gmail.com) to align with the project's goals and standards.
