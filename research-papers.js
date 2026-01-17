// 🔬 RESEARCH PAPERS DATA - FALLBACK FOR CORS ISSUES
// Real papers from arXiv (AI/ML/NLP categories)

window.RESEARCH_PAPERS = [
  {
    title: "Attention Is All You Need",
    summary: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"],
    published: "2017-06-12T00:00:00Z",
    link: "https://arxiv.org/abs/1706.03762",
    category: "cs.CL"
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    summary: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.",
    authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee", "Kristina Toutanova"],
    published: "2018-10-11T00:00:00Z",
    link: "https://arxiv.org/abs/1810.04805",
    category: "cs.CL"
  },
  {
    title: "GPT-3: Language Models are Few-Shot Learners",
    summary: "Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic in architecture, this method still requires task-specific fine-tuning datasets of thousands or tens of thousands of examples. We show that scaling up language models greatly improves task-agnostic, few-shot performance.",
    authors: ["Tom B. Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah"],
    published: "2020-05-28T00:00:00Z",
    link: "https://arxiv.org/abs/2005.14165",
    category: "cs.CL"
  },
  {
    title: "Deep Residual Learning for Image Recognition",
    summary: "Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.",
    authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
    published: "2015-12-10T00:00:00Z",
    link: "https://arxiv.org/abs/1512.03385",
    category: "cs.CV"
  },
  {
    title: "Generative Adversarial Networks",
    summary: "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G.",
    authors: ["Ian J. Goodfellow", "Jean Pouget-Abadie", "Mehdi Mirza", "Bing Xu"],
    published: "2014-06-10T00:00:00Z",
    link: "https://arxiv.org/abs/1406.2661",
    category: "cs.LG"
  },
  {
    title: "Adam: A Method for Stochastic Optimization",
    summary: "We introduce Adam, an algorithm for first-order gradient-based optimization of stochastic objective functions, based on adaptive estimates of lower-order moments. The method is straightforward to implement, is computationally efficient, has little memory requirements, is invariant to diagonal rescaling of the gradients, and is well suited for problems that are large in terms of data and/or parameters.",
    authors: ["Diederik P. Kingma", "Jimmy Ba"],
    published: "2014-12-22T00:00:00Z",
    link: "https://arxiv.org/abs/1412.6980",
    category: "cs.LG"
  },
  {
    title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting",
    summary: "Deep neural nets with a large number of parameters are very powerful machine learning systems. However, overfitting is a serious problem in such networks. Large networks are also slow to use, making it difficult to deal with overfitting by combining the predictions of many different large neural nets at test time. Dropout is a technique for addressing this problem.",
    authors: ["Nitish Srivastava", "Geoffrey Hinton", "Alex Krizhevsky", "Ilya Sutskever"],
    published: "2014-06-15T00:00:00Z",
    link: "https://arxiv.org/abs/1207.0580",
    category: "cs.LG"
  },
  {
    title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
    summary: "Training Deep Neural Networks is complicated by the fact that the distribution of each layer's inputs changes during training, as the parameters of the previous layers change. This slows down the training by requiring lower learning rates and careful parameter initialization. We refer to this phenomenon as internal covariate shift, and address the problem by normalizing layer inputs.",
    authors: ["Sergey Ioffe", "Christian Szegedy"],
    published: "2015-02-11T00:00:00Z",
    link: "https://arxiv.org/abs/1502.03167",
    category: "cs.LG"
  },
  {
    title: "You Only Look Once: Unified, Real-Time Object Detection",
    summary: "We present YOLO, a new approach to object detection. Prior work on object detection repurposes classifiers to perform detection. Instead, we frame object detection as a regression problem to spatially separated bounding boxes and associated class probabilities. A single neural network predicts bounding boxes and class probabilities directly from full images in one evaluation.",
    authors: ["Joseph Redmon", "Santosh Divvala", "Ross Girshick", "Ali Farhadi"],
    published: "2015-06-08T00:00:00Z",
    link: "https://arxiv.org/abs/1506.02640",
    category: "cs.CV"
  },
  {
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    summary: "Neural machine translation is a recently proposed approach to machine translation. Unlike the traditional statistical machine translation, the neural machine translation aims at building a single neural network that can be jointly tuned to maximize the translation performance. The models proposed recently for neural machine translation often belong to a family of encoder-decoders.",
    authors: ["Dzmitry Bahdanau", "Kyunghyun Cho", "Yoshua Bengio"],
    published: "2014-09-01T00:00:00Z",
    link: "https://arxiv.org/abs/1409.0473",
    category: "cs.CL"
  },
  {
    title: "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks",
    summary: "Convolutional Neural Networks (ConvNets) are commonly developed at a fixed resource budget, and then scaled up for better accuracy if more resources are available. In this paper, we systematically study model scaling and identify that carefully balancing network depth, width, and resolution can lead to better performance.",
    authors: ["Mingxing Tan", "Quoc V. Le"],
    published: "2019-05-28T00:00:00Z",
    link: "https://arxiv.org/abs/1905.11946",
    category: "cs.CV"
  },
  {
    title: "Vision Transformer (ViT): An Image is Worth 16x16 Words",
    summary: "While the Transformer architecture has become the de-facto standard for natural language processing tasks, its applications to computer vision remain limited. In vision, attention is either applied in conjunction with convolutional networks, or used to replace certain components of convolutional networks while keeping their overall structure in place.",
    authors: ["Alexey Dosovitskiy", "Lucas Beyer", "Alexander Kolesnikov"],
    published: "2020-10-22T00:00:00Z",
    link: "https://arxiv.org/abs/2010.11929",
    category: "cs.CV"
  },
  {
    title: "CLIP: Learning Transferable Visual Models From Natural Language Supervision",
    summary: "State-of-the-art computer vision systems are trained to predict a fixed set of predetermined object categories. This restricted form of supervision limits their generality and usability since additional labeled data is needed to specify any other visual concept. Learning directly from raw text about images is a promising alternative.",
    authors: ["Alec Radford", "Jong Wook Kim", "Chris Hallacy", "Aditya Ramesh"],
    published: "2021-02-26T00:00:00Z",
    link: "https://arxiv.org/abs/2103.00020",
    category: "cs.CV"
  },
  {
    title: "Diffusion Models Beat GANs on Image Synthesis",
    summary: "We show that diffusion models can achieve image sample quality superior to the current state-of-the-art generative models. We achieve this on unconditional image synthesis by finding a better architecture through a series of ablations. For conditional image synthesis, we further improve sample quality with classifier guidance.",
    authors: ["Prafulla Dhariwal", "Alex Nichol"],
    published: "2021-05-11T00:00:00Z",
    link: "https://arxiv.org/abs/2105.05233",
    category: "cs.CV"
  },
  {
    title: "LLaMA: Open and Efficient Foundation Language Models",
    summary: "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens, and show that it is possible to train state-of-the-art models using publicly available datasets exclusively, without resorting to proprietary and inaccessible datasets.",
    authors: ["Hugo Touvron", "Thibaut Lavril", "Gautier Izacard", "Xavier Martinet"],
    published: "2023-02-27T00:00:00Z",
    link: "https://arxiv.org/abs/2302.13971",
    category: "cs.CL"
  },
  {
    title: "Segment Anything (SAM)",
    summary: "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop, we built the largest segmentation dataset to date (by far), with over 1 billion masks on 11M licensed and privacy respecting images.",
    authors: ["Alexander Kirillov", "Eric Mintun", "Nikhila Ravi", "Hanzi Mao"],
    published: "2023-04-05T00:00:00Z",
    link: "https://arxiv.org/abs/2304.02643",
    category: "cs.CV"
  },
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    summary: "As AI systems become more capable, we would like to enlist their help to supervise other AIs. We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs. The only human oversight is provided through a list of rules or principles, and so we call the method 'Constitutional AI'.",
    authors: ["Yuntao Bai", "Saurav Kadavath", "Sandipan Kundu", "Amanda Askell"],
    published: "2022-12-15T00:00:00Z",
    link: "https://arxiv.org/abs/2212.08073",
    category: "cs.CL"
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    summary: "Large pre-trained language models have been shown to store factual knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks. However, their ability to access and precisely manipulate knowledge is still limited, and hence on knowledge-intensive tasks, their performance lags behind task-specific architectures.",
    authors: ["Patrick Lewis", "Ethan Perez", "Aleksandra Piktus", "Fabio Petroni"],
    published: "2020-05-22T00:00:00Z",
    link: "https://arxiv.org/abs/2005.11401",
    category: "cs.CL"
  },
  {
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    summary: "We explore how generating a chain of thought -- a series of intermediate reasoning steps -- significantly improves the ability of large language models to perform complex reasoning. In particular, we show that sufficiently large language models can perform chain of thought reasoning via simple prompting.",
    authors: ["Jason Wei", "Xuezhi Wang", "Dale Schuurmans", "Maarten Bosma"],
    published: "2022-01-28T00:00:00Z",
    link: "https://arxiv.org/abs/2201.11903",
    category: "cs.CL"
  },
  {
    title: "InstructGPT: Training language models to follow instructions with human feedback",
    summary: "Making language models bigger does not inherently make them better at following a user's intent. For example, large language models can generate outputs that are untruthful, toxic, or simply not helpful to the user. We show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback.",
    authors: ["Long Ouyang", "Jeff Wu", "Xu Jiang", "Diogo Almeida"],
    published: "2022-03-04T00:00:00Z",
    link: "https://arxiv.org/abs/2203.02155",
    category: "cs.CL"
  },
  {
    title: "Flamingo: a Visual Language Model for Few-Shot Learning",
    summary: "Building models that can be rapidly adapted to novel tasks using only a handful of annotated examples is an open challenge for multimodal machine learning research. We introduce Flamingo, a family of Visual Language Models (VLM) with this ability. Flamingo models can be adapted to a variety of image and video understanding tasks with few-shot learning.",
    authors: ["Jean-Baptiste Alayrac", "Jeff Donahue", "Pauline Luc", "Antoine Miech"],
    published: "2022-04-29T00:00:00Z",
    link: "https://arxiv.org/abs/2204.14198",
    category: "cs.CV"
  },
  {
    title: "Stable Diffusion: High-Resolution Image Synthesis with Latent Diffusion Models",
    summary: "By decomposing the image formation process into a sequential application of denoising autoencoders, diffusion models (DMs) achieve state-of-the-art synthesis results on image data and beyond. Additionally, their formulation allows for a guiding mechanism to control the image generation process without retraining.",
    authors: ["Robin Rombach", "Andreas Blattmann", "Dominik Lorenz", "Patrick Esser"],
    published: "2021-12-20T00:00:00Z",
    link: "https://arxiv.org/abs/2112.10752",
    category: "cs.CV"
  },
  {
    title: "Whisper: Robust Speech Recognition via Large-Scale Weak Supervision",
    summary: "We study the capabilities of speech processing systems trained simply to predict large amounts of transcripts of audio on the internet. When scaled to 680,000 hours of multilingual and multitask supervision, the resulting models generalize well to standard benchmarks and are often competitive with prior fully supervised results.",
    authors: ["Alec Radford", "Jong Wook Kim", "Tao Xu", "Greg Brockman"],
    published: "2022-12-06T00:00:00Z",
    link: "https://arxiv.org/abs/2212.04356",
    category: "cs.CL"
  },
  {
    title: "PaLM: Scaling Language Modeling with Pathways",
    summary: "Large language models have been shown to achieve remarkable performance across a variety of natural language tasks using few-shot learning, which drastically reduces the number of task-specific training examples needed to adapt the model to a particular application. We introduce PaLM 540B, a 540-billion parameter, densely activated, Transformer language model.",
    authors: ["Aakanksha Chowdhery", "Sharan Narang", "Jacob Devlin", "Maarten Bosma"],
    published: "2022-04-05T00:00:00Z",
    link: "https://arxiv.org/abs/2204.02311",
    category: "cs.CL"
  },
  {
    title: "Chinchilla: Training Compute-Optimal Large Language Models",
    summary: "We investigate the optimal model size and number of tokens for training a transformer language model under a given compute budget. We find that current large language models are significantly undertrained, a consequence of the recent focus on scaling language models whilst keeping the amount of training data constant.",
    authors: ["Jordan Hoffmann", "Sebastian Borgeaud", "Arthur Mensch", "Elena Buchatskaya"],
    published: "2022-03-29T00:00:00Z",
    link: "https://arxiv.org/abs/2203.15556",
    category: "cs.CL"
  },
  {
    title: "GPT-4 Technical Report",
    summary: "We report the development of GPT-4, a large-scale, multimodal model which can accept image and text inputs and produce text outputs. While less capable than humans in many real-world scenarios, GPT-4 exhibits human-level performance on various professional and academic benchmarks.",
    authors: ["OpenAI"],
    published: "2023-03-15T00:00:00Z",
    link: "https://arxiv.org/abs/2303.08774",
    category: "cs.CL"
  },
  {
    title: "Gemini: A Family of Highly Capable Multimodal Models",
    summary: "This report introduces a new family of multimodal models, Gemini, that exhibit remarkable capabilities across image, audio, video, and text understanding. The Gemini family consists of Ultra, Pro, and Nano sizes, suitable for applications ranging from complex reasoning tasks to on-device memory-constrained use-cases.",
    authors: ["Gemini Team", "Google"],
    published: "2023-12-19T00:00:00Z",
    link: "https://arxiv.org/abs/2312.11805",
    category: "cs.AI"
  },
  {
    title: "Mistral 7B",
    summary: "We introduce Mistral 7B, a 7-billion-parameter language model engineered for superior performance and efficiency. Mistral 7B outperforms the best open 13B model (Llama 2) across all evaluated benchmarks, and the best released 34B model (Llama 1) in reasoning, mathematics, and code generation.",
    authors: ["Albert Q. Jiang", "Alexandre Sablayrolles", "Arthur Mensch", "Chris Bamford"],
    published: "2023-10-10T00:00:00Z",
    link: "https://arxiv.org/abs/2310.06825",
    category: "cs.CL"
  },
  {
    title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    summary: "Foundation models, now powering most of the exciting applications in deep learning, are almost universally based on the Transformer architecture and its core attention module. Many subquadratic-time architectures such as linear attention, gated convolution and recurrent models, and structured state space models (SSMs) have been developed to address Transformers' computational inefficiency on long sequences.",
    authors: ["Albert Gu", "Tri Dao"],
    published: "2023-12-01T00:00:00Z",
    link: "https://arxiv.org/abs/2312.00752",
    category: "cs.LG"
  },
  {
    title: "Mixtral of Experts",
    summary: "We introduce Mixtral 8x7B, a Sparse Mixture of Experts (SMoE) language model. Mixtral has the same architecture as Mistral 7B, with the difference that each layer is composed of 8 feedforward blocks (i.e. experts). For every token, at each layer, a router network selects two experts to process the current state and combine their outputs.",
    authors: ["Albert Q. Jiang", "Alexandre Sablayrolles", "Antoine Roux", "Arthur Mensch"],
    published: "2024-01-08T00:00:00Z",
    link: "https://arxiv.org/abs/2401.04088",
    category: "cs.LG"
  }
];
