**参考**：https://alz-journals.onlinelibrary.wiley.com/doi/full/10.1002/alz.13758

# Abstract
## BACKGROUND
## METHODS
## RESULTS
## DISCUSSION
Alzheimer's disease, a progressive neurodegenerative diseases, is marked by cognitive decline and memory loss. Annual cases exceed ten million, imposing a substantial burden on individuals, families, and healthcare systems. Accurate diagnosis is crucial. To tackle this issue, we introduce a task-integrated deep learning framework for neuroimaging synthesis and disease classification. SHapley Additive exPlanations (SHAP) and statistical differential analysis are employed to assess the contributions of clinical and imaging attributes to the classification model, emphasizing impacted brain regions. Voxel-based Morphometry (VBM) is utilized to substantiate structural disparities in these regions.
Test results from the Alzheimer's Disease Neuroimaging Initiative (ADNI) dataset showcase our approach's exceptional performance in neuroimaging synthesis and classification evaluation metrics. By integrating SHAP and VBM analyses, we illuminate Alzheimer's effects on specific cerebral region imaging characteristics and brain network complexity, highlighting deep learning's efficacy in multimodal data exploration and pathological mechanism understanding. Our model prioritises interpretability and transparency, enhancing its credibility. Our research underscores the urgency and significance of precise Alzheimer's diagnosis. Our proposed framework, coupled with advanced analytical techniques, significantly contributes to neuroimaging synthesis and classification, facilitating improved comprehension, diagnosis, and treatment of this condition.
**Keywords**: Alzheimer's disease, Generative Adversarial Networks, Multimodal Fusion Classification Model, SHAP Analysis, Voxel-Based Morphometry
# Introduction

Alzheimer's disease, a major form of dementia, represents approximately two-thirds of all dementia cases. Typically commencing in midlife, it prompts a steady decline in memory and cognitive abilities, ultimately culminating in the complete loss of cognitive function and self-care abilities. The "China Alzheimer's Disease Report 2022" reveals that China's ranking in Alzheimer's-related mortality has escalated from tenth to fifth place over the past three decades. This upward trend undoubtedly amplifies the economic burden on individuals and places greater demand on healthcare resources. Mild Cognitive Impairment (MCI) represents an intermediate stage between normal cognitive (NC) and AD, exhibiting cognitive impairments. annually, 15\% of MCI patients progress to Alzheimer's disease. Currently, there is no definitive cure for Alzheimer's disease. Research suggests that brain lesions associated with Alzheimer's might emerge as much as two decades prior to the onset of cognitive decline symptoms. Consequently, early diagnosis of Alzheimer's holds significant importance for treatment efficacy and prognostic implications.

As neuroimaging technologies advance, structural magnetic resonance imaging (sMRI) and fluorodeoxyglucose positron emission tomography (FDG-PET) scans have emerged as essential tools for understanding brain tissue structure and glucose metabolism. Common structural alterations in Alzheimer's patients involve atrophy in regions such as the amygdala, hippocampus, and entorhinal cortex. FDG-PET scans uncover modifications in glucose metabolism, as Alzheimer's disease often perturbs brain glucose utilization patterns. In the early stages, FDG-PET scans reveal diminished glucose metabolism in the amygdala and hippocampus, which may precede detectable structural changes visible via sMRI. Consequently, sMRI and FDG-PET scans (abbreviated as MRI and PET hereafter) are considered reliable biomarkers for monitoring Alzheimer's disease progression.

Nonetheless, due to the stringent technical prerequisites and substantial expenses associated with PET scans, neuroimaging data often emerges in an unpaired form. The ADNI dataset reveals a ratio of MRI to PET subjects of 4196 to 2475, resulting in notable data missing. In response, cross-modality synthesis has emerged as an cost-effective strategy for acquiring high-quality image data across diverse modalities. By employing MRI and PET scans as biomarkers, clinical data derived from neuropsychological and cognitive assessments can objectively assess and quantify cognitive abilities, thereby assisting in the diagnosis of mild cognitive impairment and Alzheimer's disease. These techniques yield supplementary information and play a pivotal role in classification model predictions. Merging multimodal neuroimaging data with clinical data provides complementary insights, enabling a more thorough comprehension of disease traits and mechanisms. This integration amplifies the model's predictive prowess. Yet, interpretability challenges may arise from these complex models.

SHAP analysis has been introduced as a technique to elucidate the outputs of prediction models. It illumines the decision-making process of deep learning models, uncovering the pivotal elements driving their predictions. By offering a more profound comprehension of how the model employs neuroimaging and clinical data, SHAP analysis amplifies the utility of our predictive outcomes. VBM is a widely employed method in neuroimaging analysis, providing a thorough assessment of brain architecture and enabling exact detections of volume alterations in different brain regions. Aligning SHAP analysis findings with VBM results validates the model's interpretability and dependability, thereby advancing our understanding of disease pathological progression.

In recent years, deep learning has revolutionized the realm of computer vision and medical imaging. Among various deep learning models, Generative Adversarial Networks (GANs) have particularly captivated attention for their remarkable ability in cross-modality synthesis of medical images. GANs' distinct architectural design and adversarial loss function effectively mitigate the drawbacks associated with blurry estimations, which are prevalent in L1 and L2 loss functions. Res-CycleGAN, a groundbreaking model introduced by Harms et al., produces high-quality images by eliminating artifacts through a CBCT to corrected CBCT mapping. Another noteworthy mention is Wang et al.'s LA-GAN, a multi-modal GAN that synthesizes superior-quality PET scans from existing PET and MR images, employing location-adaptive and automatic context strategies. Gao et al.'s innovative model integrates pyramid convolution, attention modules, and disease classification tasks to significantly boost GANs' capability to generate missing PET data. In terms of interpretability, \cite{25} employed XGBoost, a powerful machine learning classifier, to predict chronic kidney disease in patients. Through SHAP analysis, they identified hemoglobin and albumin as the most substantial contributors to CKD detection. \cite{26}'s study leveraged CNNs to differentiate between Alzheimer's Disease dementia and non-Alzheimer's Disease dementia. Their findings underscored that the DEMO and ALZ scores generated by the CNN model were the key determinants in identifying AD and nADD.

Building on previous research, we introduce a task-integrated multimodal deep learning framework consisting of 3D BicycleGAN and Multi-modal Fusion Neural Network (MFNet). Initially, we employ BicycleGAN to generate cross-modal neuroimaging, followed by a fusion model performing disease classification on multimodal data. By leveraging BicycleGAN's image generation and MFNet's information fusion, our method investigates neuroimaging and clinical data's potential information and complementary attributes. To enhance interpretability and determine the impact of each feature on classification decisions, we employed SHAP analysis to reveal the effects of neuroimaging and clinical data on model predictions. Validating these findings with VBM, we ensure their biological plausibility. This approach not only improves the model's predictive performance but also increases our understanding of disease and neuroimaging feature influences.
> [!check]
> 

The structure of this paper is as follows: Section 2 presents the dataset and preprocessing procedures. Section 3 provides a thorough explanation of the proposed methodology. Section 4 demonstrates the experimental results. Section 5 discusses the strengths and limitations of the approach; and finally, Section 6 offers concluding insights from the study.

  

\section{Materials}

\subsection{Data Acquisition and Preprocessing}

\subsubsection{Data Acquisition}

The imaging and clinical data utilised in this study were obtained the Alzheimer's Disease Neuroimaging Initiative (ADNI)\cite{27}. This initiative, primarily funded by the National Institutes of Health, focuses on advancing neuroimaging and biomarker research for AD and MCI. We selected T1-weighted MRI and PET data from ADNI-1 and ADNI-2 projects, along with clinical data including demographics, cognitive assessments, functional evaluations, and medication history, as shown in Table \ref{tab1}. To improve model evaluation accuracy and mitigate overfitting concerns, a 5-fold cross-validation approach was used on the dataset.

\begin{table*}[!t]

\caption{Demographic and clinical information of the research subjects} %表格的标题

\label{tab1}

\centering

\begin{threeparttable}

\begin{tabular}{@{}cccccc@{}}

\toprule

Task & Category & Gender(F/M) & Age & MMSE & CDR \\ \midrule

\multirow{2}{*}{Cla-NA} & NC & 105/106 & 75.1±5.6 & 29.0±1.1 & 0.0±0.0 \\ \cmidrule(l){2-6}

& \multirow{2}{*}{AD} & \multirow{2}{*}{84/120} & \multirow{2}{*}{75.4±7.7} & \multirow{2}{*}{23.2±2.1} & \multirow{2}{*}{0.8±0.2} \\ \cmidrule(r){1-1}

\multirow{2}{*}{Cla-MA} & & & & & \\ \cmidrule(l){2-6}

& MCI & 38/88 & 75.0±7.7 & 27.1±1.7 & 0.5±0.0 \\ \bottomrule

\end{tabular}

\begin{tablenotes}

\footnotesize

\item\textnormal MMSE: Mini-mental state examination \quad CDR: Clinical dementia rating

\end{tablenotes}

\end{threeparttable}

\end{table*}

\subsubsection{Data Preprocessing}

\paragraph{Image Data Preprocessing}

The image preprocessing workflow started with converting PET from DICOM to NIfTI format\cite{28}. Subsequent steps were executed using FSL and Python scripts, including skull stripping, image registration, and downsampling to 128x128x128 for BicycleGAN input\cite{29}. To generate brain parcellation map for each subject, we deployed nonlinear registration algorithm, and 'invwarp' method to obtain inverse deformation field files. This allowed data mapping from standard to original MRI spaces. Next, we applied the 'applywarp' method to the Hammersmith Adult Brain Atlas, transforming it for each subject. This step preserved discrete labels using nearest neighbor interpolation. Finally, SHAP values assigned to voxels were connected to their corresponding brain regions\cite{30}.

  

\paragraph{Clinical Data Preprocessing}

Regarding structured clinical data, we first encoded features to convert specific elements into digital representations. Next, we used the K-nearest neighbours algorithm to handle missing data values. To minimize the impact of scale variations on results, we standardized all features.

\section{Method}

\subsection{Overview of the Proposed Method}

This study centred on three main objectives: cross-modality neuroimaging synthesis, disease classification using multi-modal data, and SHAP analysis of the classification model(see Figure \ref{fig1}).

We used 3D BicycleGAN for cross-modality synthesis, which integrates cVAE-GAN and cLR-GAN\cite{31}. By establishing bidirectional mapping, the model learned complex relationships between MRI and PET scans, enabling high-quality PET generation\cite{32}\cite{33}.

  

In addition to the adversarial and reconstruction losses, we incorporated additional components such as Gradient Magnitude (GM) loss and Structural Similarity Index Measure (SSIM) loss to maintain structural and gradient integrity\cite{34}. MFNet completes image data analysis by utilizing parallel data extraction paths and data fusion transfer paths, and we employed paired neuroimages and clinical data as inputs. The task is segmented into two subcategories based on classification objectives: 1) Cla-NA, differentiating between NC and AD; 2) Cla-MA, distinguishing between MCI and AD.

  

To fully exploit the distinctive latent information and complementary attributes inherent in various data modalities, we designed a procedure for each subtask. First, we input paired neuroimaging data into the imaging model to extract disease-related structural and glucose metabolic features, enhancing classification accuracy. Next, we use the non-imaging model to process clinical data, including disease manifestations and risk factors, strengthening the predictive capacity of the classification model. Finally, we employ the fusion model to handle both neuroimaging and clinical data, increasing the generalization capability of the model. To assess interpretability, we performed SHAP analyses for both the non-image and image models, completing the Cla-NA and Cla-MA tasks. Our goal is to identify clinical and imaging features strongly correlated with model predictions, validating these findings with the additional deployment of VBM method.

\begin{figure*}[!t]

\centering

\includegraphics[width=1\textwidth]{fig1.png} % 图片文件名和路径

\caption{Overview of the multi-task deep learning framework for image synthesis, disease classification tasks, and SHAP analysis}

\label{fig1}

\end{figure*}

  

\subsubsection{Image Synthesis Task}

The goal of image synthesis is to transform unpaired images $S_i {\in \left\{ x_i \right\}}_i^\text{N}$ into paired images $S_i {\in \left\{ x_i,y_i \right\}}_i^\text{N}$ . However, mapping from the high-dimensional MRI input to the equally high-dimensional PET output presents specific challenges\cite{35}. To obtain high-quality results with structural fidelity, we preserved bidirectional consistency between the latent space and the generated PET image space using BicycleGAN. This dual-directional mapping streamlined the image synthesis process, allowing the model to acquire knowledge of both forward and reverse mappings.

  

In the forward mapping process, the PET $y \in {\mathbb{R}}_{\text{PET}}^{h \times w \times d}$ scan is input into the encoder, which generates a low dimensional latent encoding vector $z$ that captures the primary features of PET scan. This vector is then combined with MRI $x \in {\mathbb{R}}_{\text{MRI}}^{h \times w \times d}$ and fed into the generator. A non-linear mapping $G(x,z)\to y$ is learned, resulting in a synthesized PET image. To encourage alignment with a random Gaussian distribution, we used Kullback-Leibler (KL) divergence during this process\cite{36}.

  

In the backward mapping process, a PET scan generated from an MRI and a low-dimensional latent vector $z$ (sampled from a Gaussian distribution) are fed into the encoder to reconstruct input vector $z$. This process is represented as: $z \to \hat y \to z$. Through this bidirectional mapping, the model utilizes latent encoding to encode hidden structure and semantic information in PET images throughout training\cite{37}.

  

\paragraph{Architectures}

Our proposed BicycleGAN's network architecture, as shown in Figure \ref{fig2}, primarily consists of three key components: the generator, discriminator and encoder.

\begin{figure*}[t]

\centering

\includegraphics[width=1\textwidth]{fig2.png}

\caption{Overview of BicycleGAN}

\label{fig2}

\end{figure*}

\begin{itemize}

\item The generator employs a U-Net structure with encoder (downsampling) and decoder (upsampling) paths, connecting encoder feature maps to decoder feature maps through skip connections\cite{38}.

\item The discriminator uses a PatchGAN, which evaluates local regions in synthesised PET images and generates a score map for these regions. Unlike conventional discriminators, PatchGAN focuses more on local structures and textures.

\item ResNet encoder is used to extract structural features from PET images, composed of convolutional, normalization, ReLU activation, average pooling layers, and residual connection structures.

\end{itemize}

  

\paragraph{Loss functions}

To improve synthesis quality and model generalization, we adopted a hybrid loss function for network parameter optimization. In the bidirectional mapping process, forward and backward mapping adversarial losses are expressed as follows:

\begin{equation}

\label{eq1}

\begin{aligned}

&\mathcal{L}_{\text{adv}}^{\text{Forward}}(G,D,E) = \mathbb{E}_{x,y \sim p(x,y)}\left[ \log\log \left( D(x,y)\right)\right] \\

& + \mathbb{E}_{x,y \sim p(x,y),z \sim E(y)}\left[ \log\log (1-D(x,G(x,z)))\right]

\end{aligned}

\end{equation}

  

  

\begin{equation}

\label{eq2}

\begin{aligned}

&\mathcal{L}_{\text{adv}}^{\text{Forward}}(G,D) = \mathbb{E}_{x,y \sim p(x,y)}\left[ \log\log \left( D(x,y)\right)\right] \\

& + \mathbb{E}_{x,y \sim p(x,y),z \sim p(z)}\left[ \log\log (1-D(x,G(x,z)))\right]

\end{aligned}

\end{equation}

  

Reconstruction loss, measured as L1 norm difference between corresponding voxels in synthetic and real images, is displayed for forward and backward mapping.

\begin{align}

& \mathcal{L}_{\text{rec}}^{\text{Forward}}(G) = \mathbb{E}_{x,y \sim p(x,y),z \sim E(y)} \lVert y-G(x,z) \rVert_1 \\

& \mathcal{L}_{\text{rec}}^{\text{Backward}}(G,E) = \mathbb{E}_{x,y \sim p(x,y),z \sim E(y)} \lVert z-E(G(x,z)) \rVert_1

\end{align}

  

We incorporate KL-divergence to ensure the latent encoding vector matches the distribution of the latent sampling vector, derived from a standard Gaussian distribution. The KL-divergence constraint can be calculated as follows:

\begin{equation}

\label{eq6}

\begin{aligned}

\mathcal{L}_{\text{KL}}(E)=\mathbb{E}_{y \sim p(y)} \left[ D_{\text{KL}}(E(y) \parallel \mathcal{N}(0,1))\right]

\end{aligned}

\end{equation}

among which $D_{\text{KL}}(p \parallel q)=-\int p(z) \log \frac{p(z)}{g(z)}dz$

  

Nevertheless, the adversarial loss may not align the synthesized image with the real data distribution effectively. Additionally, the reconstruction loss only focuses on voxel disparity, neglecting image structural and gradient information. To tackle this, we introduce SSIM and GM loss. SSIM loss enhances image structure, while GM loss provides richer gradient information. Their combination significantly improves image quality and utility.

  

The SSIM loss is a perception-oriented quality assessment approach that considers voxel correlation and efficiently evaluates structural similarity. It can be expressed as follows:

\begin{equation}

\label{eq6}

\begin{aligned}

\mathcal{L}_{\text{SSIM}}=1-\frac{(2\mu_{\hat y}\mu_y+C_1)(2 \sigma_{\hat y y}+C_2)}{(\mu_{\hat y}^2+\mu_y^2+C_1)(\sigma_{\hat y^2}+ \sigma_y^2+C_2)}

\end{aligned}

\end{equation}

Here $\mu_y$, $\mu_{\hat y}$ denote the means of the real and the synthesized PET image, respectively. $\sigma_y$, $\sigma_{\hat y}$ are their variances, and $\sigma_{y \hat y}$is the covariance between them. $C_1$, $C_2$ are variables used for stabilizing the division operation.

  

The incorporation of GM loss ensures that the synthesized image aligns with the real image in terms of gradients, reducing image blurriness perception and improving model training stability\cite{22}. The GM loss can be mathematized as follows:

\begin{equation}

\label{eq7}

\begin{aligned}

\mathcal{L}_{\text{GM}}= \frac{1}{D}\frac{1}{H}\frac{1}{W} \sum_{D}\sum_{H}\sum_{W}|\bigtriangledown_{D,H,W}\hat y-\bigtriangledown_{D,H,W}y|^2

\end{aligned}

\end{equation}

  

Here $D$, $H$, and $W$ denote image depth, height, and width, respectively, while $\bigtriangledown \left( \centerdot \right)$ represents the gradient.

  

With the previously discussed hybrid loss functions in mind, the optimization objective for the BicycleGAN model can be expressed as follows:

  

\begin{equation}

\label{eq8}

\begin{aligned}

G_{*},E_{*}= &\arg \min_{G,E}\max_D \mathcal{L}_{\text{adv}}^{\text{Forward}}(G,D,E)+ \mathcal{L}_{\text{adv}}^{\text{\text{Backward}}}(G,D) \\

& + \lambda_{\text{rec}}\mathcal{L}_{\text{rec}}^{\text{Forward}}(G)+\lambda_{\text{z}}\mathcal{L}_{\text{rec}}^{\text{Backward}}(G,E)\\

& + \lambda_{\text{KL}}\mathcal{L}_{\text{KL}}(E)+\lambda_{\text{SSIM}}\mathcal{L}_{\text{SSIM}}+\lambda_{\text{GM}}\mathcal{L}_{\text{GM}}

\end{aligned}

\end{equation}

  

Where $\lambda_{\text{rec}}$, $\lambda_{\text{z}}$, $\lambda_{\text{KL}}$, $\lambda_{\text{SSIM}}$, $\lambda_{\text{GM}}$ are hyperparameters used to control the weights of the corresponding loss items.

  

\subsubsection{Disease Classification Task}

Following the application of BicycleGAN to synthesise the missing PET images, the subsequent task involves learning and extracting features from multimodal data for disease classification. Considering the diversity of the data, we developed corresponding models for image and non-image data for evaluation:

\begin{itemize}

\item Image model: a deep neural network consisting of feature extraction, fusion, transfer, and dense blocks to handle image data (see Figure \ref{fig3}). The model integrates two parallel data extraction paths for extracting features from diverse dimensions, a shared data fusion and transfer path by MRI and PET modalities, and multiple linear layer at the end. The data extraction paths are composed of numerous dense blocks, whose dense connection structure enhances the expression of low-level features\cite{43}. The data fusion and transfer path enables the model to capture more comprehensive and richer disease-related information by harmoniously integrating PET and MRI image features at different levels.

\item Non-image model: an CatBoost-based machine learning model for processing non-image data, facilitating robust handling of diverse data types, with particular emphasis on categorical data\cite{42}. This enables us to extract valuable insights from clinical data.

\item Fusion model:

The fusion model (see Figure \ref{fig4}) merges the imaging model with an MLP for clinical data analysis, efficiently extracting and combining diverse features through multiple linear layers to achieve comprehensive fusion of imaging and clinical data.

\end{itemize}

  

\begin{figure*}[t]

\centering

\includegraphics[width=\textwidth, height=0.3\textheight]{fig3.png}

\caption{The structure of the image model}

\label{fig3}

\end{figure*}

  

  

\begin{figure*}[t]

\centering

\includegraphics[width=\textwidth,height=0.35\textheight]{fig4.png}

\caption{The structure of the fusion model}

\label{fig4}

\end{figure*}

  

\subsubsection{SHAP Analysis Task}

SHAP analysis generates SHAP values for each feature to understand model predictions, examining changes in model output with the presence or absence of specific features. For Cla-NA and Cla-MA tasks, we performed SHAP analysis on both non-image and image models, aiming to identify clinical and image features significantly positively correlated with model predictions. SHAP values derived from the image model quantify each voxel’s impact on the model’s disease stage prediction.

  

Associating SHAP values with personalized brain parcellation maps, we calculated contribution values for each participant in 49 brain regions, enhancing interpretability and reliability by analyzing intergroup differences in SHAP values for NC-AD and MCI-AD groups. We identified brain regions with significant differences in normal, mild impaired, and Alzheimer’s disease patients, considering SHAP value changes as indicators of brain structure and metabolism variations across disease stages, with these regions serving as distinguishing features for Alzheimer’s disease stages.

  

To validate our hypothesis, we utilized VBM to obtain brain region volume information and calculate the annual volume change rate index, minimizing individual differences. We anticipate VBM results to provide additional evidence for our SHAP analysis findings, offering insights into brain structure differences between groups and enhancing comprehension of Alzheimer’s disease pathology.

\section{Experiment}

In this section, we provide a comprehensive overview of the experimental setup and investigate the performance of our proposed deep learning framework in two primary areas: image synthesis and multimodal disease classification. Additionally, we elucidate the results of the SHAP analysis, disclosing the SHAP values associated with each feature and their subsequent influence on model predictions.

\subsection{Experimental settings}

In this section, we outline the experiment configurations.For BicycleGAN training, we set loss function hyperparameters to $\lambda_{rec}=10$, $\lambda_{z}=0.5$, $\lambda_{KL}=0.01$, $\lambda_{\text{SSIM}}=1$, $\lambda_{GM}=0.02$ and used the Adam optimizer with a learning rate of 0.0002. Training occurred over 200 epochs, with the initial learning rate lasting for 100 epochs, followed by a gradual decrease to zero over the next 100 epochs.

For disease classification, we employed a cross-validation approach, dividing the dataset into five consecutive folds. Each iteration involved training for 100 epochs using the Adam optimizer with a learning rate of 0.0001 and incorporating L2 regularization with a coefficient of 0.01. All image preprocessing steps were performed on Ubuntu 22.04, while model training and statistical analyses were conducted on a hardware platform with an NVIDIA GeForce GTX 3080 GPU using Python and PyTorch.

\subsection{Effectiveness of Image Synthesis Task}

\subsubsection{Quantitative Evaluation}

To evaluate the performance of our proposed BicycleGAN model in image synthesis, we employed several quantitative metrics for analysis, including Mean Squared Error, Mean Absolute Error, Maximum Mean Discrepancy, Peak Signal-to-Noise Ratio, and Structural Similarity Index.

  

Mean Squared Error (MSE) is a commonly used metric for measuring prediction errors. It calculates the average of the squares of the differences between the generated and real images, and is defined as:

\begin{equation}

\label{eq9}

\begin{aligned}

\text{MSE}(y,\hat y)=\frac{\sum_{i=1}^n(y_i^2-\hat y_i^2)}{n}

\end{aligned}

\end{equation}

  

Recognizing MSE's sensitivity to outliers, potentially skewing evaluation results, we included MAE as an additional metric. MAE averages the absolute differences between the real and generated images, making it less susceptible to outliers for more stable results. Here's its mathematical expression:

\begin{equation}

\label{eq10}

\begin{aligned}

\text{MAE}(y,\hat y)=\frac{\sum_{i=1}^n|y_i-\hat y_i|}{n}

\end{aligned}

\end{equation}

In the two formulas above, $y_i$ and $\hat y_i$ denote the voxel intensity values in the real and synthesized PET, respectively.

\begin{table*}[!t]

\caption{Quantitative comparison of image synthesis quality under different loss functions in BicycleGAN} %表格的标题

\label{table2}

\centering

\begin{tabular}{@{}lccccc@{}}

\toprule

\textbf{Loss Function} & \textbf{MAE} & \textbf{MSE} & \textbf{MMD} & \textbf{SSIM} & \textbf{PSNR} \\ \midrule

Adversarial+Reconstruction+KL & 4.60±1.74 & 101.49±61.52 & 0.52±0.27 & 0.89±0.12 & 33.95±2.57 \\

Ours & 4.45±1.06 & 99.58±56.27 & 0.66±0.13 & 0.91±0.02 & 34.03±1.74 \\ \bottomrule

\end{tabular}

  

\end{table*}

  

\begin{table*}[!t]

\caption{Quantitative comparison between different models} %表格的标题

\label{table3}

\centering

\begin{tabular}{@{}lccccc@{}}

\toprule

\textbf{Model} & \textbf{MAE} & \textbf{MSE} & \textbf{MMD} & \textbf{SSIM} & \textbf{PSNR} \\ \midrule

Cycle GAN & \textbackslash{} & 388±475 & 0.25±0.25 & 0.88±0.04 & 27.20±2.99 \\

Ours & 4.45±1.06 & 99.58±56.27 & 0.66±0.13 & 0.91±0.02 & 34.03±1.74 \\ \bottomrule

\end{tabular}

\end{table*}

MMD calculation involves mapping samples to the feature space and calculating the difference between the means of two distributions. The Gaussian kernel-based MMD formula is as follows:

%\small

\begin{equation}

\label{eq11}

\begin{aligned}

\text{MMD}(y,\hat y)=\lVert \frac{1}{n^2}\sum_{i,j}^nk(y_i,y_j) &+ \frac{1}{n^2}\sum_{i,j}^nk(\hat y_i,\hat y_j)\\

&-\frac{2}{n^2}\sum_{i,j}^nk(y_i,\hat y_j)\rVert

\end{aligned}

\end{equation}

%normalsize

In the formula above , $k(y,\hat y)=e^{\frac{\lVert y-\hat y \rVert^2}{2 \sigma ^2}}$is the Gaussian kernel function, representing the Euclidean distance.

  

PSNR is a common metric for evaluating image quality. It measures the maximum possible error between the original and reconstructed images, as shown in the following formula:

\begin{equation}

\label{eq12}

\begin{aligned}

\text{PSNR}(y,\hat y)=10 \big( \frac{\text{MAX}^2}{\text{MSE}(y, \hat y)}\big)

\end{aligned}

\end{equation}

Here, MAX represents the maximum possible pixel value in the image.

  

SSIM is crucial in our experiments, serving as a loss function component during training and a quantitative evaluation metric. SSIM ranges from -1 to 1, with higher values indicating greater similarity between the generated and original images.

  

Our approach slices 3D images into 2D sections, applies evaluation formula sto each slice, and aggregates results to derive a comprehensive image quality indicator for the entire 3D image. This considers each slice's quality to provide a thorough evaluation.

  

In this study, we optimized BicycleGAN's network parameters with mixed loss functions. We conducted comparative experiments with and without SSIM and GM losses to analyze their impact on image synthesis. The results, as shown in Table \ref{table2}, indicated a significant improvement in model performance after incorporating these losses. Error maps also demonstrated reduced pixel differences between generated and original images, suggesting that SSIM and GM losses enhance visual quality by aiding the model in capturing structural information and gradient distribution. In Table \ref{table3}, we highlighted BicycleGAN's advantage in capturing latent relationships between different data modalities, leading to better PET image generation. This was attributed to the integration of bidirectional mapping in the model, which promotes high-quality PET image generation. Overall, BicycleGAN demonstrates strong robustness and produces high-quality synthetic images in image synthesis tasks.

\subsubsection{Qualitative Evaluation}

Moreover, we conducted a qualitative assessment of the generated images from the same subjects. Each row sequentially presents images generated without SSIM+GM loss, with SSIM+GM loss, and real images (see Figure \ref{subfig5b}). Visually, BicycleGAN-generated images closely resemble real images in terms of shape, size, and structure. However, color contrast is more consistent in images generated with additional losses. Figure \ref{subfig5a} compares the mean and median of error maps on various anatomical directions after adding an additional loss function. These qualitative results agree with the quantitative analysis, highlighting BicycleGAN's superior performance in generating high-quality images. This underscores the significance of SSIM and GM loss functions in enhancing image quality, particularly concerning color and contrast.

\begin{figure*}[htbp]

  

\subfloat[Quantitative comparison of image synthesis quality under different loss functions in BicycleGAN]

{

\label{subfig5a}\includegraphics[width=0.5\textwidth]{fig5a.png}

}

\subfloat[Pixel maps under different loss functions]

{

\label{subfig5b}\includegraphics[width=0.5\textwidth]{fig5b.png}

}

\caption{Evaluation results}

\label{fig5}

\end{figure*}

  

  

\subsection{Effectiveness of Disease Classification Task}

\begin{table*}[!t]

\caption{Classification results for image models and fusion models in both Cla-NA and Cla-MA tasks}

\label{table4}

\centering

\begin{threeparttable}

\begin{tabular}{@{}llccccc@{}}

\toprule

\textbf{Task} & \textbf{Model Type} & \textbf{Accuracy} & \textbf{Sensitivity} & \textbf{Specificity} & \textbf{F1} & \textbf{MCC } \\ \midrule

Cla-NA & Image Model* & 0.86±0.01 & 0.79±0.08 & 0.92±0.04 & 0.84±0.04 & 0.72±0.03 \\

~ & Fusion Model* & 0.88±0.03 & 0.85±0.05 & 0.90±0.06 & 0.87±0.02 & 0.75±0.05 \\

~ & Image Model & 0.89±0.04 & 0.87±0.04 & 0.90±0.06 & 0.88±0.04 & 0.72±0.08 \\

~ & Fusion Model & 0.89±0.04 & 0.88±0.04 & 0.90±0.07 & 0.89±0.04 & 0.79±0.08 \\ \midrule

Cla-MA & Image Model* & 0.71±0.06 & 0.77±0.11 & 0.57±0.11 & 0.75±0.07 & 0.35±0.10 \\

~ & Fusion Model* & 0.73±0.05 & 0.79±0.09 & 0.62±0.17 & 0.78±0.06 & 0.43±0.10 \\

~ & Image Model & 0.73±0.07 & 0.81±0.08 & 0.54±0.04 & 0.80±0.08 & 0.38±0.10 \\

~ & Fusion Model & 0.71±0.05 & 0.78±0.03 & 0.58±0.13 & 0.78±0.05 & 0.35±0.11 \\ \bottomrule

\end{tabular}

\begin{tablenotes}

\footnotesize

\item[*] represents cases where both training and test sets include original and generated paired images

\end{tablenotes}

\end{threeparttable}

\end{table*}

\begin{figure*}[!t]

\centering

\includegraphics[width=\textwidth]{fig6.png}

\caption{ROC and PR Curves under Cla-NA and Cla-MA Tasks}

\label{fig6}

\end{figure*}

In this section, we performed thorough testing and evaluation of the image models and fusion models employed in disease classification. Our assessment encompassed various metrics, such as accuracy, sensitivity, specificity, F1 score, Matthews correlation coefficient, and AUC and PR curves. The specific data can be found in Table \ref{table4}.

  

Initially, we conducted a comprehensive comparison of image and fusion models utilizing original paired neuroimaging data. In both Cla-NA and Cla-MA tasks, fusion models consistently outperformed single image models, primarily due to the effective integration of information from both image and clinical data. To further assess performance, we generated ROC and PR curves through five rounds of cross-validation (see Figure \ref{fig6}). The fusion model's average AUC value exceeded the image model's in Cla-NA, while its average precision was comparable in Cla-MA.

  

We then used BicycleGAN to generate missing unpaired data and reevaluated models using both generated and original paired data. Surprisingly, image and fusion model performance remained similar whether using BicycleGAN-generated paired images or original paired images alone. This highlights the efficacy of BicycleGAN-generated images, which exhibit visual similarity to real images and impressive performance in practical classification tasks.

  

\subsection{Results of SHAP Analysis}

\subsubsection{Non-Image Model}

SHAP analysis results for non-imaging models Results are visually presented in a "bee swarm" plot, the top 20 clinical features with highest average absolute SHAP values are identified. By examining feature values and SHAP values, we can determine the most influential model features. The meaning of the specific abbreviation can be searched on \href{https://adni.loni.usc.edu/data-dictionary-search/}{ADNI Data dictionary}.

  

\begin{figure*}[!t]

\centering

\includegraphics[width=\textwidth, height=0.4\textheight]{fig7.png}

\caption{Non-image model results for SHAP analysis in the first round of cross-validation}

\label{fig7}

\end{figure*}

  

  

\begin{figure}[!h]

\centering

\includegraphics[width=0.5\textwidth]{fig8.png} % 图片文件名和路径

\caption{The non-imaging model Feature frequency distribution diagram in the five rounds of cross-validation in SHAP analysis.}

\label{fig8}

\end{figure}

  

  

For instance, the swarm plot of the first round of cross-validation explanation analysis shows a clustering trend in the Cla-NA task(refer to Figure \ref{fig7}): higher CDR feature values correspond to higher SHAP values, indicating the disease severity, while lower CDR scores result in smaller SHAP values. The significant role of CDR and CDRSum features in the model is thus highlighted. As CDR values increase, the model considers the disease more severe, enhancing interpretability. Although MMSE feature clustering is not distinct, its values and SHAP values show an inverse relationship. The model primarily relies on CDR and CDRSum for disease stage differentiation, while MMSE and FAQ-REMDATES are more general, and other features have distinct roles. In Cla-MA, the model relies on CDRSum, MMSE, and ADAS-total. By analyzing SHAP analysis results across five cross-validation rounds, we've identified the five most significant features for both tasks(see Figure \ref{fig8}). Synthesizing results across validations provides a more reliable understanding of crucial features for classification.

\subsubsection{Image Model}

\begin{table*}[!h]

\caption{Statistical information of the top 5 Brain Regions with differences between NC and AD groups in SHAP analysis based on MRI}

\label{table5}

\centering

\begin{tabular}{@{}lcccccl@{}}

\toprule

  

\textbf{Regions} & \multicolumn{2}{c}{\textbf{Normality}} & \textbf{Variance homogeneity} & \textbf{Difference analysis} & \textbf{Effect size} \\ \midrule

\textbf{} & \textbf{NC} & \textbf{AD} & \textbf{} & \textbf{} & \textbf{} & \\

Amygdala & 0.96/0.19 & 0.97/0.41 & 0.10/0.75 & **** & 1.33 & \\

Parahippocampal Gyrus & 0.97/0.35 & 0.99/0.97 & 0.01/0.91 & *** & 0.88 & \\

Hippocampus & 0.97/0.29 & 0.93/0.04 & 0.15/0.70 & *** & 0.85 & \\

Anterior Temporal Lobe Medial Part & 0.98/0.93 & 0.84/0.00 & 0.05/0.83 & ** & 0.66 & \\

Third Ventricle & 0.99/0.94 & 0.96/0.18 & 1.82/0.182 & **** & 0.581 & \\

\bottomrule

\end{tabular}

\end{table*}

  

\begin{table*}[!t]

\caption{Statistical information of the top 5 Brain Regions with differences between MCI and AD groups in SHAP analysis based on MRI}

\label{table6}

\centering

\begin{tabular}{@{}lccccc@{}}

\toprule

\textbf{Regions} & \multicolumn{2}{c}{\textbf{Normality}} & \textbf{Variance homogeneity} & \textbf{Difference analysis} & \textbf{Effect size} \\ \midrule

\textbf{} & \textbf{MCI} & \textbf{AD} & \multicolumn{3}{c}{\textbf{}} \\

Anterior Cingulate Gyrus & 0.94/0.21 & 0.97/0.25 & 3.13/0.08 & ** & 0.95 \\

Precentral Gyrus & 0.93/0.21 & 0.97/0.47 & 0.45/0.51 & ** & 0.90 \\

Thalamus & 0.97/0.80 & 0.96/0.13 & 0.45/0.50 & ** & 0.83 \\

Supramarginal Gyrus & 0.93/0.18 & 0.98/0.84 & 1.56/0.22 & ** & 0.78 \\

Third Ventricle & 0.97/0.71 & 0.93/0.02 & 0.80/0.38 & * & 0.61 \\

\bottomrule

\end{tabular}

\end{table*}

  

  

Normality and homogeneity of variance tests significantly affect the choice of methods for difference analysis and are essential prerequisites for group comparisons. Specifically, use the Shapiro-Wilk test to check SHAP value normality and the Levene test for variance homogeneity. If assumptions are met, use the unpaired t-test; otherwise, use the Mann-Whitney test. Once the suitable method for difference analysis is selected, compare the SHAP values of corresponding brain regions in MRI and PET between the groups.

  

In MRI analysis, significant differences in the SHAP values of 14 brain regions were found between the NC and AD groups. Table \ref{table5} lists the top five brain regions quantified by effect size measures and considered key brain regions, displaying the statistics and statistical significance levels at each testing stage.

  

The amygdala, parahippocampal gyrus, and hippocampus showed highly significant differences with effect sizes over 0.8. The medial temporal lobe and third ventricle had effect sizes between 0.5-0.8, indicating medium differences. Box plots and bar charts illustrated that the NC group’s SHAP values were predominantly positive in the amygdala, parahippocampal gyrus, hippocampus, and medial temporal lobe, while the AD group’s were negatively concentrated. This suggests that the NC group’s brain regions contribute positively to model predictions, while the AD group’s contribute negatively, potentially linked to Alzheimer’s disease pathology. The third ventricle’s SHAP values were consistently negative in the NC group and positive in the AD group, possibly due to disease-induced structural changes.

\begin{figure*}[!t]

\centering

\includegraphics[width=0.8\textwidth]{fig9.png}

  

\caption{Comparison of inter-group brain networks in SHAP analysis based on MRI}

\label{fig9}

\end{figure*}

Table \ref{table6} displays differences in five brain regions within the MCI-AD group. The SHAP value differences between the NC-AD and MCI-AD groups were not identical, with the former exhibiting more pronounced effects. This can be attributed to MCI being an intermediate AD stage, presenting less distinct brain structure differences.

  

We also conducted a SHAP value analysis on PET imaging data, revealing significant differences in multiple brain regions between groups. Notable disparities were observed in the middle frontal gyrus, lingual gyrus, and hippocampus, likely due to their crucial roles in decision-making and attention. AD pathology can cause neuronal damage, atrophy, and metabolic irregularities in these regions. In MCI-AD, differences were detected in the posterior temporal lobe, superior temporal gyrus, and angular gyrus, reflecting AD’s impact on specific brain region metabolism.

  

To investigate the correlation between SHAP values within MRI data across different brain regions, we calculated the Pearson correlations. The results suggested a decline in brain network complexity from the NC to MCI and AD groups, as shown in Figure \ref{fig9}, potentially reflecting the simplification of complex networks due to neuronal loss and neural pathway disruption.

  

In conclusion, differences in SHAP value distribution reveal structural variations in key brain regions among groups. This supports the deep learning model's prediction explanations and highlights the need for a comprehensive analysis to understand disease progression and SHAP features' interpretative significance.

\subsubsection{VBM Validation}

Due to difficulties in obtaining PET images during prognosis, we used VBM only for MRI to examine volume and annual change rate differences in key brain regions between groups.

Our findings highlight significant differences in multiple brain regions between NC and AD groups. Notably, the AD group had a lower median baseline amygdala volume (3190 $mm^3$) compared to the NC group (3444 $mm^3$), aligning with expected pathology. No differences were observed in the parahippocampal gyrus, hippocampus, medial temporal lobe, and third ventricle. AD patients exhibited accelerated hippocampal and medial temporal lobe atrophy, with larger enlargement in third ventricles compared to the NC group as shown in Figure \ref{fig10}. Moreover, in the VBM analysis between the MCI-AD groups, no differences were observed(see Figure \ref{fig11}).

  

Validation of key brain regions revealed significant volume differences in the amygdala region, aligning with Alzheimer's disease patterns. No baseline volume differences were found in the hippocampus, medial temporal lobe, and third ventricle. AD patients showed accelerated atrophy in the hippocampus and medial temporal lobe compared to NC group, with enlarged third ventricles. Our findings highlight consistent volume change patterns throughout the disease progression.

  

This suggests that the significant differences in brain regions identified by SHAP analysis don't correspond to VBM findings. This inconsistency may be due to:

\begin{itemize}

\item SHAP values explaining specific feature contributions to model predictions, which correlate with distinct brain regions, encoding non-linear relationships difficult to detect in VBM.

\item Neural network models can capture complex interactions in structural MRI features, challenging traditional statistical methodologies.

\end{itemize}

\begin{figure}[!h]

\centering

\includegraphics[width=0.5\textwidth, height=5cm]{fig10.png}

  

\caption{Differences in baseline brain volume (first row) and brain volume change rate (second row) in key brain regions between NC-AD groups}

\label{fig10}

\end{figure}

\begin{figure}[!h]

\centering

\includegraphics[width=0.5\textwidth, height=5cm]{fig11.png}

  

\caption{Differences in baseline brain volume (first row) and brain volume change rate (second row) in key brain regions between MCI-AD groups}

\label{fig11}

\end{figure}

We performed a detailed statistical analysis on the baseline whole-brain volume of our test samples, as shown in Figure \ref{fig12}. The findings highlight a significant volume difference between AD patients and NC individuals, with no noticeable distinction between MCI and AD groups. Surprisingly, our data reveals that the median whole-brain volume of both AD and MCI groups is greater than that of the NC group, contradicting the common belief that brain atrophy correlates with Alzheimer's progression. This unexpected result may be attributed to differences in baseline characteristics (e.g. age, gender, height, weight) between AD, MCI, and NC groups, which could impact brain volume measurements. It's worth noting that Alzheimer's disease is a heterogeneous condition, with varying symptoms, disease progression, and neuroimaging features among patients.

\begin{figure}[!h]

\centering

\includegraphics[width=0.5\textwidth, height=5cm]{fig12.png}

  

\caption{Differences in baseline whole brain volume among NC-MCI-AD groups}

\label{fig12}

\end{figure}

  

\section{Discussion}

The deep learning model proposed in this research showed excellent results in synthesizing neuroimaging data and diagnosing Alzheimer's disease. Our BicycleGAN model excels in image generation, delivering images with highly alignment to the target across all evaluation metrics. Moreover, the MFNet model effectively integrates multimodal data, enhancing Alzheimer's disease classification accuracy. By examining SHAP values, we uncover the vital role specific features play in shaping model predictions. This heightens model transparency and fosters a deeper comprehension of the underlying factors and pathological mechanisms associated with Alzheimer's disease.

  

Notwithstanding the encouraging initial findings, several constraints should be noted. Firstly, absent Prognostic PET data precluded VBM-based SHAP analysis validation and brain metabolic monitoring. Secondly, incorporating additional modalities like DTI and fMRI could improve disease classification accuracy. Lastly, DTI and fMRI-provided structural and functional connections can facilitate individualized brain network modeling, offering a more comprehensive reliability assessment of SHAP analysis and deeper Alzheimer's disease insights.

\section{Conclusion}

In brief, our study presents a task-integrated multimodal deep learning framework that imputes unpaired neuroimages and merges neuroimaging and clinical data to facilitate Alzheimer’s disease classification. Our results reveal that the bicycle generative adversarial network, built upon a specialized hybrid loss function, effectively addresses sample size constraints. Moreover, the integration of multimodal data enhances the model's predictive capabilities. By fusing deep learning with interpretability analysis methods, we offer a promising strategy for profound insights into Alzheimer's disease and developing superior diagnostic techniques.

  

This framework's major strengths lie in its comprehensive integration of neuroimaging and clinical data, effective handling of sample size constraints, and deep learning-based interpretability analysis. These features enhance the model's accuracy and reliability in Alzheimer's disease classification, enabling better understanding of decision-making processes and algorithm optimization. The study offers new perspectives on early diagnosis and intervention, with the potential to benefit patients in practical applications.

\section*{Acknowledgments}

We thank ADNI for providing valuable data resources for this study. We would also like to thank ShunJie Song and Yong Yang in the research group for their guidance and help in statistical analysis.

\section*{Funding}

This study was funded in part by the STI2030-Major Projects (2021ZD0200900); National Key Research and Development Project of China (2018YFA0108503); National Hainan Key Research and Development Project (ZDYF2021SHFZ049), Hainan Province Natural Science Foundation of high-level talent project (322RC588); Project of Collaborative Innovation Center of One Health (XTCX2022JKC05).

  

  

  

\bibliographystyle{IEEEtran}

\bibliography{refs}

\end{document}