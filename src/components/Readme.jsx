import {
  Box,
  ListItem,
  List,
  Link,
  Heading,
  Image,
  Text,
  flexbox,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Code,
  Divider,
  Tag,
  Center,
  Badge,
  OrderedList,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FaGithub } from 'react-icons/fa';
import React from 'react';

export const Readme = () => (
  <Box
    display={'flex'}
    flexDirection={'column'}
    alignItems={'center'}
    w={{ base: '300px', sm: '450px', md: '600px', lg: '900px' }}
    margin={'auto'}
    paddingTop={12}
  >
    <Box
      display={'flex'}
      flexDirection={{ base: 'column', sm: 'row' }}
      alignItems={'center'}
      alignContent={'start'}
    >
      <Box display={'flex'} flexDirection={'column'} alignItems={'start'} textTransform={'uppercase'}>
        <Heading
          marginBottom={15}
          textAlign={'left'}
          fontSize={{ base: '12px', sm: '13px', md: '20px', lg: '25px' }}
        >
          A User-Driven Tool <br></br>for Interactive Decision-Making <br></br> with Classification Trees
        </Heading>
        <Text
          fontSize={{ base: '10px', sm: '11px', md: '15px' }}
          textAlign={'left'}
          marginTop={-3}
          color={'white'}
          bg={'blue.600'}
        >
          Unlock the Power of Decision Trees in Your Biological Data Analysis
        </Text>
      </Box>
      <Image
        borderRadius="full"
        boxSize={{ base: '75px', sm: '150px', md: '200px', lg: '300px' }}
        src="/itree-logo.png"
        alt="iTree"
      />
    </Box>
    <Box
      display={'flex'}
      flexDirection={{ base: 'column', sm: 'row' }}
      alignItems={'center'}
      justifyItems={'stretch'}
      padding={5}
      width={'100%'}
    >
      <Heading
        width={'30%'}
        fontSize={{ base: '11px', sm: '12px', md: '18px', lg: '23px' }}
        textTransform={'uppercase'}
      >
        Key Features of ITree
      </Heading>

      <Accordion defaultIndex={[0]} allowMultiple width={'60%'}>
        <AccordionItem>
          <AccordionButton _expanded={{ bg: 'gray.600', color: 'white' }} padding={1}>
            <Box flex="1" textAlign="left" fontSize={{ base: '9px', sm: '10px', md: '14px' }}>
              Interactive Decision-Making
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={2} pt={2} textAlign={'left'} fontSize={{ base: '7px', sm: '9px', md: '13px' }}>
            Generate, modify, and explore decision trees with ease. Tailor the tree structure and node tests
            to fit your specific research needs.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.600', color: 'white' }} padding={1}>
              <Box flex="1" textAlign="left" fontSize={{ base: '9px', sm: '10px', md: '14px' }}>
                Hybrid Analysis Approach
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} pt={2} textAlign={'left'} fontSize={{ base: '7px', sm: '9px', md: '13px' }}>
            Employ a mixture of algorithms for tree construction, enabling a diverse and rich interpretation
            of your data.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.600', color: 'white' }} padding={1}>
              <Box flex="1" textAlign="left" fontSize={{ base: '9px', sm: '10px', md: '14px' }}>
                Real-Time Visualization
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} pt={2} textAlign={'left'} fontSize={{ base: '7px', sm: '9px', md: '13px' }}>
            Changes in the tree structure are instantly recalculated and visually presented, allowing you to
            gauge the impact on your prediction models and datasets promptly.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'gray.600', color: 'white' }} padding={1}>
              <Box flex="1" textAlign="left" fontSize={{ base: '9px', sm: '10px', md: '14px' }}>
                Educational and Research Tool
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} pt={2} textAlign={'left'} fontSize={{ base: '7px', sm: '9px', md: '13px' }}>
            Whether for classroom learning or advanced biomedical analysis, ITree serves as a versatile asset.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
    <Box display={'flex'} flexDirection={'column'} textAlign={'left'} padding={4}>
      <Text textTransform={'uppercase'} fontWeight={'bold'} borderBottom={'3px solid #2b6cb0'}>
        Get Started Immediately
      </Text>
      <Code marginBottom={5}>
        <Box marginTop={5}>
          Explore the capabilities of ITree using our diabetes case study dataset. This dataset features a
          real-world scenario focusing on diabetes, with three distinct classes: CTRL (Control), PD
          (Prediabetes), and T2D (Type 2 Diabetes). It provides detailed information on 68 targeted proteins
          and a discrete variable 'Fitness' indicating the patient's fitness level. The dataset is comprised
          of 87 objects in the training set and 285 in the test set.
        </Box>
        <Box marginTop={5}>
          Experiment with decision trees based on C4.5 and/or TSP tests for quick processing, or delve deeper
          using the WTSP test, which may take a few seconds longer. Analyze how patient fitness levels and
          specific proteins like IL-1Beta (IL1B), TNF-Alpha (TNFA), PGC-1Alpha (PGC1A), FOX01, and COX6C play
          a crucial role in diabetes classification.
        </Box>
        <Box marginTop={5}>
          Steps: <br />
          <OrderedList ml={'2em'} p={2}>
            <ListItem>Download and upload training set&sup1;</ListItem>
            <ListItem>Choose algorithm/s, you can take all if You want</ListItem>
            <ListItem>Set Decision attribute (for examples it will be - Class)</ListItem>
            <ListItem>
              Ignored attributes are optional but You can choose as many as You need and if You know that some
              of them may disturb the classification, such as ID this is a good place to mark it
            </ListItem>
            <ListItem>
              Minimal node size tells us about the border up to which the division continues
            </ListItem>
            <ListItem>Max tree depth determite the maximum level the tree will have</ListItem>
            <ListItem>Entropy threshold is for sensitivity of the division</ListItem>
            <ListItem>Click Draw and wait for the result</ListItem>
            <ListItem>
              When You will see the generated tree You can start modifying and analysing outcome
            </ListItem>
            <ListItem>Use Upload test set button to compare result with your set</ListItem>
          </OrderedList>
          <Box marginTop={2}>
            Ad. 1) You can upload json skeleton of decision tree based on our model of node and leaf and
            modify it. For more information, please take a look at <b>PYTHON</b> section below &#x1F61C;
          </Box>
        </Box>
      </Code>
      <Divider marginBottom={3} />
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
        <Link href="/sets/Diabetes_train.csv" isExternal>
          <Tag backgroundColor={'#01C0C0'} _hover={{ bg: ' #2b6cb0', color: 'white' }}>
            Diabetes Training Set
          </Tag>
        </Link>
        <Center height="50px">
          <Divider orientation="vertical" borderColor={'gray'} />
        </Center>{' '}
        <Link href="/sets/Diabetes_test.csv" isExternal>
          <Tag backgroundColor={'#01C0C0'} _hover={{ bg: ' #2b6cb0', color: 'white' }}>
            Diabetes Test Set
          </Tag>
        </Link>
      </Box>
      <Divider marginTop={3} />
    </Box>

    <Box marginTop={10} width={'100%'}>
      <Heading textAlign={'center'} textTransform={'uppercase'}>
        Explore Further and Collaborate
      </Heading>
      <Box mt={3}>
        <Text textAlign={'center'}>
          For more information, source code, and additional resources, visit our{' '}
          <Link
            href="https://github.com/hsokolowski/iTree"
            isExternal
            backgroundColor={'black'}
            borderRadius={100}
            border={'1px solid black'}
            color={'white'}
            padding={1}
            _hover={{ bg: 'white', color: 'black' }}
          >
            <i class="fa fa-github" style={{ fontSize: '20px' }}></i> GitHub
          </Link>{' '}
          page.
        </Text>
      </Box>
      <Divider margin={10} />
      <Box p={4}>
        <Box border={'1px solid'}>
          <Heading textAlign={'center'} textTransform={'uppercase'} size="lg" color={'grey'} mt={5}>
            PYTHON
          </Heading>
          <Box m={5} textAlign={'left'}>
            If You would like to play with own tree which you generated in Python, please use our script to
            generate json file with a structure of Your decision tree. In example we used well-known iris set,
            function is based on 'clf' object so here you can assing Your model.
            <br />
            <br />
            When you upload csv file with your data and json file with your skeleton then aplication will show
            your tree and will spread the samples over the tree.
            <br />
            <br /> You can check this feature using our prepared files:
            <UnorderedList>
              <Link href="/sets/iris_dataset.csv" isExternal>
                <ListItem>Iris dataset CSV</ListItem>
              </Link>
              <Link href="/sets/iris_skeleton.json" isExternal>
                <ListItem>Skeleton of tree JSON</ListItem>
              </Link>
            </UnorderedList>
            <Code
              mt={5}
              colorScheme="red"
              children="REMINDER: Please be aware that both files must have the same attribute names. In other way distribution won't work."
            />
            <Code w="100%" mt={5}>
              <Box>
                <UnorderedList styleType="none">
                  <ListItem>import matplotlib.pyplot as plt</ListItem>
                  <ListItem>from sklearn import tree</ListItem>
                  <ListItem>from sklearn.datasets import load_iris</ListItem>
                  <ListItem>from sklearn.tree import DecisionTreeClassifier</ListItem>
                  <ListItem>import json</ListItem>
                  <ListItem>
                    <br />
                  </ListItem>
                  <ListItem color="grey"># Load data</ListItem>
                  <ListItem>
                    iris = load_iris()
                    <br /> X = iris.data
                    <br /> y = iris.target
                  </ListItem>
                  <ListItem>
                    <br />
                  </ListItem>
                  <ListItem color="grey"># Create tree model</ListItem>
                  <ListItem>
                    clf = DecisionTreeClassifier() <br />
                    clf.fit(X, y) <br />
                  </ListItem>
                  <ListItem>
                    <br />
                  </ListItem>
                  <ListItem color="grey"># Function for generating json </ListItem>
                  <ListItem>
                    def node_to_dict(node, feature_names, target_names): <br />
                    <UnorderedList styleType="none">
                      <ListItem>
                        result = &#123;&#125; <br />
                        <ListItem color="grey"># Leaf</ListItem>
                        if clf.tree_.children_left[node] == -1:
                        <UnorderedList styleType="none">
                          <ListItem>
                            result['category'] = target_names[clf.tree_.value[node].argmax()]
                          </ListItem>
                        </UnorderedList>
                        <ListItem color="grey"># Node</ListItem>
                        else:
                        <UnorderedList styleType="none">
                          <ListItem>feature = feature_names[clf.tree_.feature[node]]</ListItem>
                          <ListItem>threshold = round(clf.tree_.threshold[node], 3)</ListItem>
                          <ListItem>predicate = "==" if isinstance(threshold, str) else "&gt;="</ListItem>
                          <ListItem>
                            weight = clf.tree_.weight[node] if hasattr(clf.tree_, 'weight') else None
                          </ListItem>
                          <ListItem> result = &#123;</ListItem>
                          <UnorderedList styleType="none">
                            <ListItem>
                              'attr2': feature,
                              <br /> 'pivot': threshold,
                              <br /> 'predicateName': predicate,
                              <br /> 'weight': weight,
                              <br /> 'match': node_to_dict(clf.tree_.children_right[node], feature_names,
                              target_names),
                              <br /> 'notMatch': node_to_dict(clf.tree_.children_left[node], feature_names,
                              target_names)
                            </ListItem>
                          </UnorderedList>
                          <ListItem>&#125;</ListItem>
                        </UnorderedList>
                        return result
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    <br />
                  </ListItem>
                  <ListItem color="grey"># Convert root of tree to json</ListItem>
                  <ListItem>tree_json = node_to_dict(0, iris.feature_names, iris.target_names)</ListItem>
                  <ListItem>
                    <br />
                  </ListItem>
                  <ListItem color="grey"># Save structure of tree to json file</ListItem>
                  <ListItem>
                    with open('decision_tree.json', 'w') as json_file: json.dump(tree_json, json_file,
                    indent=2)
                  </ListItem>
                  <ListItem>
                    <br />
                  </ListItem>
                  <ListItem color="grey"># Show plot with tree</ListItem>
                  <ListItem>
                    fig = plt.figure(figsize=(25,20)) <br />_ = tree.plot_tree(clf,
                    feature_names=iris.feature_names, class_names=iris.target_names, filled=True) <br />{' '}
                    plt.show()
                  </ListItem>
                </UnorderedList>
              </Box>
            </Code>
          </Box>
        </Box>
      </Box>
    </Box>

    <Box padding={30} mt={10} width={'100%'}>
      <Heading
        size="3xl"
        p={1}
        textAlign={'center'}
        //boxShadow={'60px -16px #01C0C0'}
        borderTop={'7px solid  #01C0C0'}
      >
        <i>Begin Your Journey with ITree</i>
      </Heading>
      <Text
        textAlign={'center'}
        mt={5}
        p={2}
        //boxShadow={'-60px 16px  #2b6cb0'}
        borderBottom={'7px solid  #2b6cb0'}
      >
        Embrace the new era of biological data analysis. ITree is not just a tool—it's your gateway to
        uncovering the complex patterns in molecular biology and beyond.
      </Text>
      <Heading mt={25} mb={15} p={5} textTransform={'uppercase'} fontSize={30}>
        Experience ITREE now!
      </Heading>
    </Box>
  </Box>
);
