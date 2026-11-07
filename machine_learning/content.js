/* ML Study Atlas — original study notes derived from the user's lecture collection.
   Each lesson includes page-level provenance; additions and corrections are labeled. */
window.ML_ATLAS = {
  sources: {
    basics: {short:'ML Basics', title:'1 .Machine Learning Basics.pdf', pages:50},
    classification:{short:'Classification',title:'2. Machine Learning - Classification.pdf',pages:47},
    nn1:{short:'NN Introduction',title:'3. Introduction to Neural Networks (NN).pdf',pages:34},
    nn2:{short:'NN Continued',title:'4. Neural Network Continued.pdf',pages:35},
    regression:{short:'Regression',title:'5. Regression.pdf',pages:14},
    clustering:{short:'Clustering',title:'6. Clustering Techniques.pdf',pages:13},
    svm:{short:'SVM',title:'7. Support Vector Machines.pptx.pdf',pages:41},
    cnn:{short:'CNN Fundamentals',title:'8. Convolutional Neural Networks.pdf',pages:47},
    imagecnn:{short:'Image Classification',title:'9. ImageClassification-CNN.pdf',pages:61},
    lab:{short:'CNN Lab',title:'Lab Sheet - CNN architecture for image classification.pdf',pages:8},
    dist:{short:'Distance Tutorial',title:'Tutorial 01 - Distance-similarity measures.pdf',pages:5},
    regtut:{short:'Regression Tutorial',title:'Tutorial 02 – Simple Linear Regression.pdf',pages:7},
    nntut:{short:'NN Tutorial',title:'Tutorial 03 - Neural Networks.pdf',pages:4},
    steps:{short:'7 Steps',title:'7 steps of ml',pages:null}
  },
  modules:[
    {id:'foundations',title:'Foundations',icon:'◈',description:'What learning means, the complete workflow, data and generalization.',tone:'violet'},
    {id:'mathematics',title:'Mathematics & Regression',icon:'ƒ',description:'Distances, prediction, least squares, and regularization.',tone:'cyan'},
    {id:'classification',title:'Classification',icon:'⊞',description:'Classification types, k-NN, decision trees and Naïve Bayes.',tone:'mint'},
    {id:'unsupervised',title:'Unsupervised Learning',icon:'◇',description:'Clustering, association rules and dimensionality reduction.',tone:'mint'},
    {id:'svm',title:'Support Vector Machines',icon:'⌁',description:'Hyperplanes, maximum margins, optimization and kernels.',tone:'orange'},
    {id:'neural',title:'Neural Networks',icon:'◎',description:'Neurons, activation, backpropagation, optimization and training.',tone:'pink'},
    {id:'cnn',title:'Computer Vision & CNNs',icon:'▦',description:'Image tensors, convolution, shapes, architectures and lab.',tone:'blue'},
    {id:'revision',title:'Revision Studio',icon:'✧',description:'Connecting ideas, exam traps, and compact formula references.',tone:'gold'}
  ],
  lessons:[
    {id:'what-is-ml',module:'foundations',title:'What is machine learning?',time:9,level:'Core',tags:['learning','hypothesis','experience'],sources:[['basics','2–14'],['classification','2–6']],overview:'Learning a useful rule from data rather than prescribing every rule by hand.',content:`
## The essential definition
**Machine learning (ML)** is the process of improving performance on a task through experience. In the lecture's formal T–P–E framing, a program learns from **experience E** on a family of **tasks T** if its performance, measured by **P**, improves with E.

For a spam filter: **T** = classify an email as spam or legitimate; **E** = examples of labeled emails; **P** = a metric such as recall, false-positive rate, or another suitable evaluation measure. Notice that performance must be measurable: “the algorithm gets smarter” is not a testable specification.

## Function approximation is the recurring idea
We observe examples (x, y) and search for a function f<sub>θ</sub>(x) that predicts y reliably on new data. The parameter set θ could represent a line's slope, a tree's splitting rules, or millions of network weights. Algorithms differ in their **hypothesis space** (the rules they can represent) and **search procedure** (how they find a good rule).

<div class="formula">data + model family + objective + optimization → learned model</div>

This is why the lectures connect ML to statistics (generalizing from samples) and computer science (efficient representation and optimization). ML is not needed for an exact deterministic calculation such as payroll; it is useful when writing every rule is impractical, relationships change, or adaptation from examples is valuable.

> [Explain] A model that exactly memorizes training examples is not necessarily good. Our real target is **generalization**: useful behavior on examples the model has never encountered.

## Traditional programming versus ML
- Traditional programming: explicit rules + input → output.
- Supervised ML training: inputs + correct outputs → parameters/rules.
- Inference: newly learned parameters + new input → prediction.

The lecture also discusses the trade-off between prior knowledge and empirical evidence. Strong assumptions can be helpful with scarce data but harmful when inaccurate. Flexible models can learn rich patterns but often require more data and careful evaluation.

## Learn the difference between a model and its training algorithm
A **model** is a mapping such as f<sub>θ</sub>(x). **Training** chooses θ. **Inference** evaluates the learned mapping without retraining it. A simple linear model may be trained with a closed-form least-squares solution or gradient descent—same model family, different training methods.
`},
    {id:'paradigms',module:'foundations',title:'Learning paradigms',time:10,level:'Core',tags:['supervised','unsupervised','reinforcement','transfer'],sources:[['basics','24–42'],['classification','4']],overview:'Different types of feedback imply fundamentally different learning problems.',content:`
## Four fundamental settings
**Supervised learning** uses labeled examples (x, y). Classification predicts a category; regression predicts a numerical quantity. Labels are the intended outputs, not features.

**Unsupervised learning** starts with data x and no target y. Goals include clustering, discovering associations, estimating distributions and reducing dimensionality. “No labels” does not mean “no objective”: a clustering algorithm still minimizes some criterion.

**Semi-supervised learning** combines a small labeled portion with a larger unlabeled portion. It tries to exploit both; useful when annotating samples is expensive.

**Reinforcement learning (RL)** involves an agent interacting with an environment. At step t it observes state s<sub>t</sub>, takes action a<sub>t</sub>, and receives reward r<sub>t+1</sub> and next state s<sub>t+1</sub>. It learns a policy π(a | s) that favors high expected cumulative reward, not necessarily the immediate reward.

<div class="formula">s<sub>t</sub> → a<sub>t</sub> → (r<sub>t+1</sub>, s<sub>t+1</sub>) · goal: maximize E[Σ γ<sup>t</sup> r<sub>t+1</sub>]</div>

> [Explain] Supervised classification provides an explicit correct answer for a sample. RL may only reveal delayed scalar reward after many actions, producing a **credit-assignment problem**: which earlier actions deserve credit or blame?

## Additional paradigms in the lectures
- **Transfer learning:** reuse representations or parameters learned on one task for another. Common in CNNs.
- **Active learning:** a learner selects which examples an oracle (often a human) should label.
- **Multi-task learning:** learn several related tasks using some shared representation.
- **Ensemble learning:** combine several models through averaging, voting, bagging or boosting. Boosting focuses newer learners on shortcomings of earlier ones.
- **Inductive versus transductive learning:** inductive builds a reusable mapping; transductive focuses on predictions for a particular set of unlabeled points.

> [Exam lens] Ask two questions: “Where does feedback come from?” and “What does the model output?” They distinguish most learning paradigms quickly.
`},
    {id:'ml-pipeline',module:'foundations',title:'The seven-step ML workflow',time:10,level:'Core',tags:['pipeline','data','deployment'],sources:[['steps','1–7'],['basics','13, 20, 47']],overview:'From defining the problem to making predictions responsibly.',content:`
## A coherent end-to-end pipeline
The supplementary **7 steps of ML** notes use a beer-versus-wine classifier with features such as color wavelength and alcohol percentage. The lecture's “Learning Process” diagram follows a similar flow: sensing/data → preprocessing → feature reduction → model learning → testing → analysis.

1. **Gather data.** Define the target, relevant features and how measurements are collected. A biased dataset can undermine every later step.
2. **Prepare data.** Clean missing or inconsistent values, encode categories, normalize where appropriate, and split before learning transformations.
3. **Choose a model.** Match prediction type, data size, interpretability needs and available compute.
4. **Train.** Produce predictions, measure loss, adjust parameters, repeat.
5. **Evaluate.** Use held-out data and metrics that match the actual objective.
6. **Tune.** Compare hyperparameters (learning rate, k, regularization strength) using validation data.
7. **Predict / deploy.** Run the selected model on genuinely unseen examples and monitor changes in the data distribution.

> [Explain] The numbered order is a learning aid, not a strict one-way waterfall. Real workflows iterate: poor evaluation may reveal a bad target definition, feature leakage, a flawed split or a model mismatch.

## Parameters versus hyperparameters
- **Parameters:** learned from examples (linear regression coefficients, NN weights, tree split values).
- **Hyperparameters:** set or searched outside normal parameter fitting (k in k-NN, tree depth limit, learning rate, SVM C, CNN filter count).

[[demo:pipeline]]

## Practical sequence: avoid data leakage
Split data into training/validation/test **before** learning global preprocessing statistics. Fit a scaler, vocabulary or imputer on training data, and apply those learned transformations to validation and test data. Otherwise the model receives information about supposed unseen data.
`},
    {id:'data-prep',module:'foundations',title:'Data preparation & features',time:11,level:'Core',tags:['features','normalization','encoding','selection'],sources:[['basics','13, 19, 47'],['lab','3']],overview:'Preprocessing choices change which patterns a model can see.',content:`
## Samples, features, and targets
If a dataset has n samples and d numerical features, write X ∈ ℝ<sup>n×d</sup>. Each **row** is a sample; each **column** is a feature. A target array y has n entries. An RGB image instead has spatial and channel dimensions; a batch can be shaped (N, H, W, C) or (N, C, H, W), depending on the framework.

## Cleaning and transformation
- **Missing values:** drop carefully or impute from training-set statistics. A separate “missing” indicator can sometimes be useful.
- **Categorical variables:** one-hot encoding avoids pretending category IDs have numerical order; ordinal encoding is suitable when order is meaningful.
- **Standardization:** z = (x − μ) / σ. Mean zero and unit variance on the fitted training data, assuming σ ≠ 0.
- **Min–max scaling:** x′ = (x − min) / (max − min), often to [0, 1] for observed training range.
- **Feature selection:** keep useful measured variables; **dimensionality reduction** creates projected/compressed features (e.g., PCA).
- **Noise filtering and extraction:** transform raw observations into more informative measurements.

> [Explain] Feature scaling matters greatly to methods based on distance or magnitude penalties: k-NN, k-means, SVMs and gradient descent. A temperature measured in degrees and an income measured in thousands must not be allowed to compete just because of units.

## Why preprocessing is part of the model
Suppose training inputs are transformed using z = (x−μ)/σ. The deployed predictor is not only f(z), but the composition **x → scaler → model**. Saving model weights while discarding the scaler gives different predictions.

## Image example from the lab
The CNN lab converts pixel intensities from 0…255 into floating-point 0…1 by dividing by 255. That is a fixed normalization; unlike estimating μ and σ from samples, its conversion constant does not leak test-set statistics.

> [Exam lens] Distinguish **feature extraction** (derive a representation), **feature selection** (choose a subset), and **normalization** (change numerical scale).
`},
    {id:'train-test',module:'foundations',title:'Training, validation & generalization',time:11,level:'Core',tags:['overfitting','bias','variance','evaluation'],sources:[['basics','19–23, 48–49'],['nn2','14–16, 24'],['lab','6–7']],overview:'What a good training score does—and does not—tell you.',content:`
## Three different jobs for data
- **Training set:** fit model parameters.
- **Validation set:** compare model designs, tune hyperparameters and decide when to stop.
- **Test set:** provide a final estimate of performance on untouched examples.

Repeatedly selecting models based on the test score effectively turns the test set into validation data. Random splitting also fails for certain time-series, patient-grouped and duplicate-heavy datasets: splits should reflect how predictions will be used.

## Underfitting and overfitting
**Underfitting:** the hypothesis space is too restrictive or training insufficient; training and validation errors are both high. **Overfitting:** training error becomes low while validation error remains high or rises; the model learns idiosyncrasies of the sample.

[[demo:fit]]

A frequent heuristic is to inspect the **generalization gap** (validation metric minus training metric, with sign interpreted appropriately). It is an indicator, not a mathematical proof.

## Common interventions
- More representative data and appropriate augmentation.
- Fewer irrelevant features or a less flexible model.
- Regularization (L1, L2, dropout), early stopping, and cross-validation.
- Better splitting and leakage checks.

> [Explain] “No free lunch” emphasizes that learning is impossible without some assumptions connecting observed examples to future cases. Independent, identically distributed data is a common convenient assumption, not a universal law: distribution shifts are real.

## Cross-validation
In k-fold cross-validation, rotate which fold is used for validation, train on the remaining folds, and summarize performance. It reduces dependence on one random split but does not replace a carefully held-out final test set.
`},
    {id:'metrics-intro',module:'foundations',title:'Losses and evaluation metrics',time:12,level:'Core',tags:['loss','accuracy','precision','recall','f1'],sources:[['basics','20, 45'],['classification','14–15'],['nn2','11–13']],overview:'Different errors have different consequences; choose the metric accordingly.',content:`
## Loss versus metric
A **loss** is the training objective per sample or batch; a **metric** reports performance for people or a downstream decision. They may coincide, but often differ. For regression, common choices include mean squared error (MSE), mean absolute error (MAE), root MSE (RMSE), and R². For classification, consider accuracy, precision, recall, specificity, F1 and cross-entropy.

## Binary confusion matrix
<table class="study-table"><tr><th></th><th>Predicted +</th><th>Predicted −</th></tr><tr><th>Actual +</th><td>TP</td><td>FN</td></tr><tr><th>Actual −</th><td>FP</td><td>TN</td></tr></table>

<div class="formula">Accuracy = (TP + TN) / N <br> Precision = TP / (TP + FP) <br> Recall = TP / (TP + FN) <br> Specificity = TN / (TN + FP) <br> F1 = 2PR / (P + R)</div>

**Precision:** of all predicted positives, how many really were positive? **Recall/sensitivity:** of all actual positives, how many were found? **Specificity:** how reliably are actual negatives rejected?

> [Explain] Accuracy is misleading under heavy class imbalance. If 99% of cases are negative, an always-negative classifier scores 99% accuracy while detecting zero positives. The metric should reflect the costs of FP and FN.

[[demo:metrics]]

## Loss families to recognize
- **Squared error:** (y−ŷ)². Large errors get disproportionate penalty.
- **Binary cross-entropy:** −[y log p + (1−y) log(1−p)]. Penalizes confident wrong probabilities.
- **Categorical cross-entropy:** −Σ y<sub>k</sub> log p<sub>k</sub> for mutually exclusive classes.
- **Hinge loss:** max(0, 1−y f(x)) with y ∈ {−1,+1}; used for margin-based classification.

> [Exam lens] First identify what counts as “positive.” Then fill the confusion matrix before substituting into formulas.
`},
    {id:'other-paradigms',module:'foundations',title:'Ensembles, active & transfer learning',time:8,level:'Extension',tags:['ensemble','bagging','boosting','active'],sources:[['basics','39–42'],['cnn','45']],overview:'Strategies for extracting more value from models and limited labels.',content:`
## Why combine learners?
An **ensemble** combines predictions from several models. For regression it may average their outputs; for classification it may vote or average class probabilities. Diversity among learners can reduce variance or improve accuracy, though correlated errors still persist.

**Bagging** trains multiple learners on resampled datasets and aggregates their predictions. Random forests add random feature selection to diversify decision trees. **Boosting** trains learners in sequence so later learners focus on difficult cases or residual errors. These are general patterns; particular algorithms have different mathematical rules.

## Active learning
When labeling is expensive, the model may ask an oracle to label informative samples. A basic query strategy chooses samples where a classifier is least certain. However, uncertainty can also be high for outliers, so querying strategies must be evaluated carefully.

## Transfer learning
Reuse a pretrained model's internal representations. A CNN pretrained on a broad image dataset can be adapted to smaller specialized datasets by freezing its feature extractor and training a new head, then optionally unfreezing later layers for **fine-tuning**.

> [Explain] Ensemble learning combines **different predictors**; transfer learning reuses **previously learned representations/weights**. They address different problems and can also be used together.
`},

    {id:'distance',module:'mathematics',title:'Distance & similarity measures',time:12,level:'Core',tags:['euclidean','manhattan','chebyshev','cosine'],sources:[['dist','1–5'],['classification','19–22']],overview:'Measure geometric difference or directional similarity between samples.',content:`
## Four measures from Tutorial 01
For equal-length vectors a and b with d components:
<div class="formula">Euclidean: √[Σ(a<sub>i</sub> − b<sub>i</sub>)²] <br> Manhattan: Σ |a<sub>i</sub> − b<sub>i</sub>| <br> Chebyshev: max<sub>i</sub> |a<sub>i</sub> − b<sub>i</sub>| <br> Cosine similarity: (a · b) / (‖a‖₂ ‖b‖₂)</div>

Cosine **distance** is commonly defined as 1 − cosine similarity, which is the distinction noted in the handwritten tutorial. It is not generally a proper metric. Cosine similarity is undefined if either vector has zero norm.

## A complete two-dimensional example
A = (2,3), B = (7,9) gives coordinate differences (5,6).
- Euclidean = √(25+36) = **√61 ≈ 7.810**.
- Manhattan = |5|+|6| = **11**.
- Chebyshev = max(5,6) = **6**.
- Cosine similarity = (2·7 + 3·9) / (√13 · √130) = **41/√1690 ≈ 0.9973**.
- Cosine distance ≈ **0.0027**.

[[demo:distance]]

## Which one should you choose?
Euclidean reflects straight-line displacement. Manhattan reflects axis-wise travel. Chebyshev is governed by the largest coordinate deviation. Cosine similarity ignores overall positive scaling and emphasizes vector **direction**; it is useful in many text/embedding applications.

> [Explain] A and 100A have cosine similarity 1 despite being far apart in Euclidean distance. Direction and magnitude answer different questions. Scale features before distance-based learning when their units should not determine importance.

## Remaining tutorial inputs
Tutorial 01 also asks about A=(0.52,−0.36), B=(−0.44,0.67); 3D Manhattan; Chebyshev for small decimals; and cosine similarity of (2,3,1) and (0,4,2). These are solved in the separate **Distance tutorial: eight solved problems** lesson.
`},
    {id:'distance-tutorial',module:'mathematics',title:'Distance tutorial: eight solved problems',time:11,level:'Tutorial',tags:['worked','euclidean','cosine','chebyshev'],sources:[['dist','1–5']],overview:'All eight questions from the distance/similarity worksheet, evaluated clearly.',content:`
## Questions 1–2: Euclidean distance
Recall d₂(a,b)=√Σ(aᵢ−bᵢ)².

1. A=(2,3), B=(7,9): √[(7−2)²+(9−3)²] = √61 ≈ **7.8102**.
2. A=(0.52,−0.36), B=(−0.44,0.67): √[(−0.96)²+(1.03)²] = √1.9825 ≈ **1.4080**.

## Questions 3–4: Manhattan distance
Recall d₁(a,b)=Σ|aᵢ−bᵢ|.

3. A=(2,3), B=(7,9): |5|+|6| = **11**.
4. A=(8,−12,4), B=(11,3,−5): |3|+|15|+|−9| = **27**.

## Questions 5–6: Chebyshev distance
Recall d∞(a,b)=max |aᵢ−bᵢ|.

5. A=(2,3), B=(7,9): max(5,6) = **6**.
6. A=(−0.67,−0.87), B=(0.75,−0.67): max(1.42,0.20) = **1.42**.

## Questions 7–8: Cosine similarity and distance
Cosine similarity is (a·b)/(‖a‖‖b‖); the tutorial explicitly notes that **cosine distance = 1−cosine similarity**.

7. A=(2,3), B=(7,9): dot=41, squared norms=13 and 130. Similarity = 41/√1690 ≈ **0.99733**. Distance ≈ **0.00267**.
8. A=(2,3,1), B=(0,4,2): dot=14, squared norms=14 and 20. Similarity = 14/√280 ≈ **0.83666**. Distance ≈ **0.16334**.

> [Explain] The worksheet's handwritten answers for cosine questions calculate similarity first. The distance question is completed by subtracting that result from 1. For nonzero vectors, cosine values must lie between −1 and 1, a useful quick check.

> [Exam lens] Show vector subtraction (for geometric distances) or dot product and norms (for cosine) before writing a decimal answer. Preserve negative signs until after the absolute value or square.
`},
    {id:'regression-basics',module:'mathematics',title:'Linear regression & least squares',time:14,level:'Core',tags:['ols','slope','intercept','linear'],sources:[['regression','2–7'],['classification','8–10'],['regtut','1–7']],overview:'Fit a line or hyperplane that predicts a numeric outcome.',content:`
## Model and terminology
For one predictor: **ŷ = β₀ + β₁x**, where β₁ is the slope and β₀ the intercept. Observations may be written y = β₀ + β₁x + ε with ε as a residual/noise term. With d features, **ŷ = β₀ + Σ βⱼxⱼ**.

The goal of ordinary least squares (OLS) is to minimize the **sum of squared errors**: Σ(y<sub>i</sub>−ŷ<sub>i</sub>)².

## Closed-form fit with one feature
<div class="formula">β₁ = Σ[(xᵢ−x̄)(yᵢ−ȳ)] / Σ[(xᵢ−x̄)²] <br> β₀ = ȳ − β₁x̄</div>

The denominator must be nonzero, so predictor values cannot all be identical. The same model can be fitted using gradient descent; OLS is the **objective**, whereas a closed-form solution or gradient descent is a way to minimize it.

## Why minimize squared residuals?
Residual eᵢ = yᵢ − ŷᵢ is the prediction error for one point. Squaring avoids positive/negative cancellation and penalizes large errors more strongly. This makes OLS sensitive to outliers, so inspect your data instead of assuming all points are equally reliable.

[[demo:regression]]

## Interpretation limits
A coefficient expresses an association with a one-unit change in a predictor while holding other included predictors fixed. **Regression by itself does not establish causation**; confounding, selection bias, and model misspecification can produce misleading relationships.

> [Explain] In n-feature regression the decision surface lives in d-dimensional feature space, but the output is still a scalar. A “linear” regression model is linear in its **coefficients**; transformed inputs can still model curved relationships.
`},
    {id:'regression-quality',module:'mathematics',title:'Residuals, SSE, MSE and R²',time:12,level:'Core',tags:['residual','sse','tss','rss','r2'],sources:[['regtut','1–7'],['regression','5–7']],overview:'Understand exactly what regression quality formulas measure.',content:`
## Three related sums of squares
Given observed values yᵢ, predictions ŷᵢ and mean ȳ:
<div class="formula">SSE = Σ(yᵢ − ŷᵢ)² <br> TSS = Σ(yᵢ − ȳ)² <br> ESS (explained sum of squares) = Σ(ŷᵢ − ȳ)²</div>

For ordinary least squares **with an intercept**, TSS = SSE + ESS on training data. Some notes call ESS **RSS (regression sum of squares)**; other textbooks call the residual sum of squares RSS instead. **Always check which convention the exam uses.**

<div class="formula">MSE = SSE / n &nbsp; · &nbsp; RMSE = √MSE <br> R² = 1 − SSE/TSS</div>

For OLS with an intercept on the same training sample, R² also equals ESS/TSS. R² measures the fraction of total variation explained relative to a constant-mean baseline. It can be negative on held-out data or models without the appropriate conditions; it is not a percentage of predictions that are correct.

## Numerical exercise from Tutorial 02
For samples (1,2), (2,3), (3,7): x̄ = 2, ȳ = 4. The fitted line is **ŷ = −1 + 2.5x**. Its predictions are 1.5, 4 and 6.5; residuals are 0.5, −1 and 0.5.

SSE = 0.25+1+0.25 = **1.5**; TSS = 4+1+9 = **14**; explained SS = 6.25+0+6.25 = **12.5**. MSE=**0.5**, RMSE≈**0.7071**, R²=12.5/14≈**0.8929**. At x=4, the prediction is **9**.

> [Explain] Some statistical courses define a residual variance estimator as SSE/(n−p), with p fitted coefficients. The tutorial explicitly asks for the ML-style MSE = SSE/n. The denominator depends on what quantity you are estimating.
`},
    {id:'regression-families',module:'mathematics',title:'Ridge, Lasso, polynomial & logistic',time:12,level:'Core',tags:['ridge','lasso','logistic','regularization'],sources:[['regression','8–14'],['classification','9–11']],overview:'Regression names hide several distinct targets and penalty choices.',content:`
## Ridge: L2 shrinkage
Ridge modifies least squares with a quadratic coefficient penalty:
<div class="formula">J(β) = Σ(yᵢ−ŷᵢ)² + λ Σ<sub>j=1…d</sub> βⱼ²</div>

Larger λ discourages large coefficients and can reduce variance when predictors are highly correlated (multicollinearity). Intercepts are typically not penalized. Under standard formulations ridge generally shrinks coefficients toward zero but not exactly to zero.

## Lasso: L1 shrinkage and selection
<div class="formula">J(β) = Σ(yᵢ−ŷᵢ)² + λ Σ<sub>j=1…d</sub> |βⱼ|</div>

Lasso can set some coefficients **exactly to zero**, making it useful for sparse selection. With strongly correlated predictors, the selected member of a group can be unstable; it does not always choose one in a uniquely meaningful way.

## Polynomial regression
Use x, x², …, x<sup>m</sup> as input features:
<div class="formula">ŷ = β₀ + β₁x + β₂x² + … + βₘxᵐ</div>

It is nonlinear in x but **linear in β**. Fitting a high-degree polynomial does not require the curve to pass through every data point unless special interpolation conditions are imposed.

## Why logistic regression is classification
Logistic regression normally predicts a **binary class probability** by applying sigmoid to a linear score:
<div class="formula">p(y=1 | x) = σ(β·x+b) = 1 / (1+e<sup>−(β·x+b)</sup>)</div>

Choose class 1 when p exceeds a selected threshold (often 0.5). Its name includes “regression” because the *log-odds* are modeled linearly; the usual task is classification. For several mutually exclusive classes, multinomial logistic regression uses softmax.

> [Exam lens] Ridge = L2; Lasso = L1; polynomial = feature expansion; logistic = probability/classification. Do not confuse these dimensions.
`},
    {id:'learning-optimization',module:'mathematics',title:'Gradient descent as an optimizer',time:12,level:'Core',tags:['gradient','learning-rate','sgd'],sources:[['nn2','4–5, 17–23'],['regression','5']],overview:'Iteratively move model parameters in a loss-reducing direction.',content:`
## The update rule
For an objective J(θ), gradient descent computes a gradient and updates parameters:
<div class="formula">θ ← θ − η ∇<sub>θ</sub> J(θ)</div>

The gradient points in the direction of fastest local increase (for Euclidean geometry), so the **negative** gradient points toward local decrease for a sufficiently small step. η is the learning rate.

[[demo:gradient]]

## Batch, stochastic, and mini-batch
- **Full batch:** one gradient over the whole training set per update; stable but expensive with many samples.
- **SGD:** use a single training sample per update; noisy updates can help exploration but fluctuate.
- **Mini-batch:** average gradients over a subset such as 32 or 64 samples; common for neural networks.

## Learning rate behavior
Too small → slow progress. Too large → overshooting, oscillation or divergence. Poor weight initialization, ill-scaled features, flat regions and complex curvature can make training harder. Learning-rate schedules and adaptive optimizers can help.

**Momentum** accumulates some previous update direction so movement does not reset each iteration. **Adam** combines moving averages of gradients and squared gradients, yielding an adaptive step per parameter.

> [Explain] “Gradient” and “weight update” are not interchangeable. Backpropagation **computes derivatives**; an optimizer such as SGD or Adam **uses them to change weights**.
`},

    {id:'classification-task',module:'classification',title:'Classification and output types',time:10,level:'Core',tags:['binary','multiclass','multilabel'],sources:[['classification','5–16'],['basics','26–28']],overview:'Predict categories rather than a continuous measurement.',content:`
## The classification objective
A classifier maps input features x to one or more class labels. It may output a **score**, a **probability estimate**, or a final **label**, depending on the model. Classes can describe emails, images, fraud alerts, sentiments or categories of text.

## Binary, multiclass, multilabel
- **Binary:** exactly two possible labels, such as spam/non-spam.
- **Multiclass:** choose one of K > 2 mutually exclusive labels, such as cat/dog/bird.
- **Multilabel:** choose any subset of labels; one photo might contain dog **and** bicycle.

> [Explain] A model with three output neurons is not automatically “multilabel.” Output interpretation and training loss matter: softmax + categorical cross-entropy generally models one mutually exclusive class; independent sigmoid outputs + binary cross-entropy often model multilabel assignments.

## Linear classification
A score f(x)=w·x+b divides feature space by the boundary f(x)=0. In 2D this is a line; in 3D a plane; in d dimensions a (d−1)-dimensional hyperplane (if w ≠ 0). The sign can map to −1 or +1.

## Class imbalance and decisions
Often a false negative and false positive do not carry equal consequences. A classifier can be tuned by adjusting its decision threshold. This changes precision/recall without necessarily changing the estimated probabilities.

## A small taxonomy
**k-NN** uses nearby labeled examples; **decision trees** learn conditional splits; **Naïve Bayes** applies Bayes' rule under conditional-independence assumptions; **SVMs** construct large-margin boundaries; **neural networks** learn nonlinear compositions of features.
`},
    {id:'knn',module:'classification',title:'k-nearest neighbors (k-NN)',time:12,level:'Core',tags:['knn','lazy-learning','distance'],sources:[['classification','17–26'],['dist','1–5']],overview:'Let nearby stored examples vote for a new sample.',content:`
## Algorithm
For a new x: (1) choose a distance metric; (2) compute its distance to stored training samples; (3) choose the **k nearest**; (4) take the majority label for classification, or aggregate their targets for regression.

k-NN is **instance-based**, **lazy** (little explicit training), and **non-parametric**. It stores a dataset rather than finding a small fixed set of global weights.

[[demo:knn]]

## Choosing k
A small k gives a flexible, noisy boundary (k=1 is particularly sensitive to individual outliers). A large k smooths predictions and can miss local structure. At k = n, every prediction tends toward the overall majority class. Choose k using validation or cross-validation, not a magic formula.

Ties can occur even when k is odd in multiclass settings. Options include a deterministic tie-break or inverse-distance voting. If the classes are imbalanced, class weighting or evaluation changes may be more appropriate.

## Computational considerations
Simple brute-force prediction costs roughly O(nd) per query for n samples and d features, plus neighbor selection. Memory use is O(nd). Spatial indexes can accelerate suitable low-dimensional problems, but high-dimensional nearest-neighbor search becomes hard.

## A lecture example
Classification slides ask about the point **(3,7)** for a training table with features “acid durability” and “strength,” using k=3. The three neighbors determine the output; the slide uses squared Euclidean distance for ranking, which gives the same nearest-neighbor order as Euclidean distance.

> [Explain] k-NN is sensitive to feature scaling because distance is the whole definition of neighborhood. Also distinguish the **k in k-NN** (neighbors) from the **k in k-means** (clusters).
`},
    {id:'decision-trees',module:'classification',title:'Decision trees & ID3',time:13,level:'Core',tags:['tree','entropy','information-gain','id3'],sources:[['classification','32–38']],overview:'Learn a hierarchy of questions to partition the sample space.',content:`
## Tree anatomy
A decision tree has **internal nodes** (feature tests), **edges** (outcomes), and **leaf nodes** (predictions). To classify a new example, follow feature tests from the root to a leaf. A path can be rewritten as an if–then rule.

## Entropy: how mixed is a label distribution?
For class probabilities p₁,…,p<sub>K</sub>:
<div class="formula">H(Y) = − Σ<sub>k</sub> pₖ log₂ pₖ</div>

Pure nodes have H=0. A balanced binary node has H=1 bit. Use the convention 0·log₂0 = 0.

## Information gain in ID3
<div class="formula">Gain(S, A) = H(S) − Σ<sub>v∈values(A)</sub> [ |Sᵥ| / |S| ] H(Sᵥ)</div>

Choose the feature whose split produces the largest reduction in weighted label entropy, create children for its values, and recurse. Stop when the node is pure, no useful split remains, or another stopping condition applies.

## Weather / “Play Golf” from lecture
The classic 14-row table has **9 Yes and 5 No**, giving H≈0.940. Its “Outlook” split creates three groups; the lecture computes weighted entropy ≈0.693, so gain ≈**0.247**. A high information gain suggests a more informative feature at the node.

> [Explain] ID3 handles categorical feature splits naturally. Greedy local choices do not guarantee a globally smallest or optimal tree. Trees can overfit: limit depth, minimum samples per leaf, prune, or use ensembles.

## Other common split criteria
**Gini impurity** = 1 − Σ pₖ² (common in CART). **Entropy** = −Σ pₖ log₂ pₖ. Both measure class mix but have different numerical scales.
`},
    {id:'naive-bayes',module:'classification',title:'Naïve Bayes classification',time:12,level:'Core',tags:['bayes','probability','conditional-independence'],sources:[['classification','39–47']],overview:'Turn learned likelihoods into class probabilities with a simplifying assumption.',content:`
## Bayes' theorem
<div class="formula">P(C | X) = P(X | C) P(C) / P(X)</div>

**P(C)** is a prior; **P(X|C)** is the likelihood of the observed features given class C; **P(C|X)** is the posterior. Since P(X) is the same for every candidate class, a classifier may compare only P(C)P(X|C).

## The “naïve” assumption
If X=(x₁,…,x<sub>d</sub>), Naïve Bayes assumes features are **conditionally independent given the class**:
<div class="formula">ĉ = argmax<sub>c</sub> P(c) ∏<sub>j=1…d</sub> P(xⱼ | c)</div>

This factorization turns estimation of a complicated joint likelihood into estimation of individual feature likelihoods. The assumption is often imperfect, yet the classifier can still work well.

## A tiny worked case
Suppose P(Spam)=0.4, P(“offer”|Spam)=0.75 and P(“offer”|Ham)=0.10, with P(Ham)=0.6. For a message containing “offer”, unnormalized scores are Spam = 0.4·0.75 = **0.30** and Ham = 0.6·0.10 = **0.06**. After normalization: P(Spam|offer)=**0.8333**.

## Variants and practical issues
- **Multinomial NB:** often used for token counts.
- **Bernoulli NB:** useful for binary present/absent indicators.
- **Gaussian NB:** assumes continuous features have class-conditional Gaussian distributions.
- **Smoothing:** avoids a zero count making a product zero (e.g., Laplace smoothing).

> [Explain] Multiplying many probabilities can underflow numerically. Implementations sum log probabilities instead. Independence is conditional **on the class**, not necessarily unconditional.
`},
    {id:'classification-evaluation',module:'classification',title:'Classification evaluation in practice',time:10,level:'Core',tags:['precision','recall','confusion','threshold'],sources:[['classification','14–15'],['basics','45']],overview:'Go beyond accuracy and reason about the cost of mistakes.',content:`
## Begin with a confusion matrix
Mark which class is considered positive. Count TP, FP, TN and FN. Then compute **precision** (TP/(TP+FP)), **recall** (TP/(TP+FN)), **specificity** (TN/(TN+FP)), **accuracy**, and **F1** (harmonic mean of precision and recall).

For example, with TP=40, FP=10, FN=20 and TN=130: accuracy = 170/200 = **0.85**; precision = 40/50 = **0.80**; recall = 40/60 ≈ **0.667**; specificity = 130/140 ≈ **0.929**; F1 ≈ **0.727**.

## Precision–recall trade-off
Lowering a decision threshold usually increases the number of predicted positives. This may raise recall while also creating more false positives. Raising the threshold can increase precision at a cost to recall, though individual datasets can behave irregularly.

[[demo:metrics]]

## Further metrics mentioned in lectures
**Average precision** summarizes a precision–recall ranking curve. **Likelihood/log loss** scores predicted probabilities. **MRR** (mean reciprocal rank) and **cumulative gain** are especially meaningful for ranked retrieval tasks rather than generic hard-label classification.

> [Exam lens] “How many of the retrieved items are relevant?” → precision. “How many relevant items did we retrieve?” → recall. Different questions, different denominators.
`},

    {id:'svm-hyperplanes',module:'svm',title:'Linear classifiers & hyperplanes',time:11,level:'Core',tags:['svm','linear','hyperplane','perceptron'],sources:[['svm','4–11'],['classification','27–29']],overview:'Geometry first: a separating boundary is an equation, not an opaque algorithm.',content:`
## From scores to boundaries
A linear classifier computes f(x) = wᵀx + b. With labels y ∈ {−1,+1}, classify by sign(f(x)). The boundary is **wᵀx + b = 0**. w is perpendicular (normal) to the boundary; b shifts its position.

In **one feature** the boundary is a point, **two features** a line, **three features** a plane. For d dimensions, it is a (d−1)-dimensional hyperplane when w is nonzero.

## Linear separability
The dataset is linearly separable if there exist w and b such that yᵢ(wᵀxᵢ+b)>0 for every sample. If the classes overlap, a perfect straight boundary may not exist.

## Perceptron connection
The perceptron adjusts weights when a labeled point lies on the wrong side of the boundary. With a standard augmented bias form:
<div class="formula">If yᵢ(wᵀxᵢ+b) ≤ 0: <br> w ← w + η yᵢxᵢ ; &nbsp; b ← b + η yᵢ</div>

The algorithm converges in finite updates under the usual assumptions for linearly separable finite data (perceptron convergence theorem), but its resulting separator need not maximize the margin.

> [Clarification] The perceptron update printed on some SVM slides uses an expression involving sign(f(xᵢ)); that is not the standard labeled update. Use yᵢxᵢ for the correction when labels are ±1.

## Why is a boundary's direction important?
The signed distance from x to wᵀx+b=0 is (wᵀx+b)/‖w‖. Normalizing by ‖w‖ matters: multiplying both w and b by 10 changes the raw score but **does not move the boundary**.
`},
    {id:'svm-margin',module:'svm',title:'Maximum-margin SVM',time:14,level:'Core',tags:['svm','margin','support-vectors','primal'],sources:[['svm','11–26'],['classification','28–29']],overview:'Choose the separating hyperplane with the widest safe corridor.',content:`
## What SVM optimizes
Many separating lines may correctly classify the training set. A hard-margin Support Vector Machine chooses one maximizing the minimum geometric distance to the training points. Nearby critical points are **support vectors**.

With labels yᵢ ∈ {−1,+1}, scale w and b so that the closest signed score is 1:
<div class="formula">minimize ½‖w‖² <br> subject to yᵢ(wᵀxᵢ+b) ≥ 1 for all i.</div>

This is the **primal** hard-margin optimization problem. Under its canonical scaling, distance from the central boundary to either margin hyperplane is 1/‖w‖, and the **full margin width** is 2/‖w‖.

[[demo:svm]]

## Support vectors and margin constraints
The hyperplanes **wᵀx+b = ±1** bound the margin. Points that reach one of these constraints control the separating solution (under suitable non-degenerate conditions); distant points typically do not affect the solution.

## Where Lagrange multipliers enter
Introduce one nonnegative multiplier αᵢ per margin constraint. Optimizing the Lagrangian produces a **dual** formulation in dot products of training samples. For the linear case, w = Σ αᵢ yᵢ xᵢ. Samples with αᵢ > 0 are support vectors (subject to the usual optimality conditions).

> [Explain] An SVM is still a linear classifier in the original feature space if it uses the linear kernel. Its novelty compared with a generic perceptron lies primarily in the **margin-optimizing objective**.

> [Exam lens] If w is scaled while preserving the geometric boundary, compare **distance normalized by ‖w‖**, never raw f(x) scores.
`},
    {id:'svm-soft-margin',module:'svm',title:'Soft margins, hinge loss & C',time:12,level:'Core',tags:['svm','hinge','slack','regularization'],sources:[['svm','27–34'],['nn2','12']],overview:'Balance a large margin against imperfect classification.',content:`
## Why a soft margin?
Real data often has noise or overlapping classes. Hard-margin constraints can then become infeasible. Introduce slack variables ξᵢ ≥ 0 so points may intrude into the margin or be misclassified.

<div class="formula">minimize ½‖w‖² + C Σ ξᵢ <br> subject to yᵢ(wᵀxᵢ+b) ≥ 1−ξᵢ and ξᵢ ≥ 0.</div>

This is equivalent to a regularized hinge-loss formulation (up to normalization and parameter conventions):
<div class="formula">hinge(y, f) = max(0, 1 − y f(x))</div>

- Margin safely satisfied (y·f ≥ 1) → zero hinge loss.
- Correct side but inside margin (0 < y·f < 1) → positive hinge loss.
- Wrong side (y·f ≤ 0) → hinge loss at least 1.

## The meaning of C
**Larger C** increases the cost of violating margin constraints, usually favoring fewer/lower violations at the expense of a narrower margin and possible overfitting. **Smaller C** permits more violations while favoring stronger regularization and potentially a wider margin.

> [Clarification] The wording on SVM slide 31 reverses this relationship. For the displayed conventional objective ½‖w‖² + CΣξᵢ, larger C means violations are **more expensive**, not less. Exact behavior on a dataset can vary, but the penalty direction is fixed by the formula.

## Hyperparameters worth remembering
For a linear SVM: C. For an RBF-kernel SVM: often C and γ. The input feature scale affects both distances and kernels, so standardizing features is commonly important.
`},
    {id:'svm-kernels',module:'svm',title:'Nonlinear SVM & the kernel trick',time:11,level:'Core',tags:['svm','kernels','rbf','polynomial'],sources:[['svm','35–41'],['classification','30–31']],overview:'Create nonlinear decision boundaries without explicitly building huge feature maps.',content:`
## Linear in a transformed space
Some datasets are not linearly separable in their original features. A mapping φ(x) can make them easier to separate in a new space. A linear hyperplane in φ-space may correspond to a **curved decision boundary** in the original input space.

The dual SVM objective and decision function depend on dot products φ(xᵢ)·φ(xⱼ). A kernel function can compute this similarity directly:
<div class="formula">K(x, z) = φ(x)ᵀφ(z) <br> f(x) = Σ<sub>i</sub> αᵢ yᵢ K(xᵢ, x) + b</div>

## Common kernels
- **Linear:** K(x,z) = xᵀz.
- **Polynomial:** K(x,z) = (γxᵀz + r)<sup>d</sup> with valid parameter settings.
- **RBF / Gaussian:** K(x,z) = exp(−γ‖x−z‖²), γ>0.
- **Sigmoid:** tanh(γxᵀz+r); it is not a valid Mercer kernel for all parameter values.

## γ and C do different jobs
For an RBF kernel, larger γ makes similarity decline faster with distance and can create more localized, flexible boundaries; smaller γ produces smoother, longer-range influence. **C** controls the slack-loss penalty. Both can affect generalization and should be tuned on validation data.

> [Explain] The kernel trick avoids explicitly forming potentially enormous φ(x), but it is not free: kernel methods may require storing or working with many pairwise similarities, which becomes costly for large datasets.

## When SVMs are attractive
They can handle high-dimensional features and produce sparse support-vector decision functions. Nonlinear kernels may be effective on smaller to medium-sized datasets, but training cost, parameter tuning, and interpretability are practical trade-offs.
`},
    {id:'neuron',module:'neural',title:'The artificial neuron',time:12,level:'Core',tags:['perceptron','weights','bias','affine'],sources:[['nn1','20–28'],['nntut','1–4']],overview:'A neuron is a weighted sum followed by a chosen function.',content:`
## From biological analogy to mathematics
The introduction slides begin with biological neurons and move to a simple artificial computation unit. The **artificial neuron** is not a simulation of every biological property: it combines inputs with learned weights, adds a bias, and optionally applies a nonlinear activation function.

<div class="formula">z = w · x + b = Σ<sub>j=1…d</sub> wⱼxⱼ + b <br> a = φ(z)</div>

Here x and w are equal-length vectors, **w·x is a scalar dot product**, b is a scalar bias, z is the **pre-activation**, and a is the output. The term *affine transformation* means linear mapping plus an offset.

## Why bias matters
Without b, the neuron's zero-response boundary must pass through the origin for a linear score. With bias, the threshold can move. A bias can be treated as a weight on a constant artificial input x₀=1, which is a convenient notation—not a new measured feature.

## One worked tutorial example
Given w=(0.44,0.10,0.38,0.59), x=(0.77,0.67,0.12,0.62), b=0.89:
<div class="formula">z = 0.44(0.77)+0.10(0.67)+0.38(0.12)+0.59(0.62)+0.89 <br> = 1.7072</div>

The sigmoid output is σ(1.7072) ≈ **0.8464**. This matches the procedure shown in Tutorial 03.

[[demo:neuron]]

## Perceptron versus a general neuron
A classical perceptron often uses a **hard threshold** to produce one of two labels. Modern neural networks typically use differentiable or piecewise differentiable activations, making gradient-based training practical.

> [Explain] A weighted sum alone cannot create a nonlinear decision rule; stacking only affine layers still collapses to one affine transformation. **Nonlinear activation functions** enable a multilayer network to represent nonlinear mappings.
`},
    {id:'activations',module:'neural',title:'Activation functions & outputs',time:12,level:'Core',tags:['sigmoid','relu','tanh','softmax'],sources:[['nn1','29–32'],['nn2','10–13'],['nntut','1']],overview:'Nonlinearities make deep networks expressive; output activations express the task.',content:`
## Four common activations
<div class="formula">Identity: φ(z) = z <br> Sigmoid: σ(z) = 1 / (1+e<sup>−z</sup>) <br> Tanh: tanh(z) ∈ (−1,1) <br> ReLU: max(0,z)</div>

**Identity** is useful when a regression output should be unconstrained. **Sigmoid** maps real scores into (0,1), useful as a binary probability parameter. **Tanh** is centered around zero but saturates at large magnitudes. **ReLU** passes positive values and zeros negative ones; it is simple and commonly used in hidden layers.

## Softmax for exclusive multiclass predictions
For K logits z₁,…,z<sub>K</sub>:
<div class="formula">softmax(z)<sub>i</sub> = e<sup>zᵢ</sup> / Σ<sub>j=1…K</sub> e<sup>zⱼ</sup></div>

Every output lies in (0,1) and the sum is 1. Implementations subtract the maximum logit before exponentiation for numerical stability. Applying the same constant shift to all logits leaves probabilities unchanged.

[[demo:activation]]

## Match the output to the target
- **Unbounded regression:** often linear output with MSE/MAE.
- **Binary classification:** one sigmoid output with binary cross-entropy, or two softmax logits with categorical cross-entropy.
- **Exclusive multiclass:** K softmax outputs with categorical cross-entropy.
- **Multilabel:** K independent sigmoids with binary cross-entropy.

> [Explain] Sigmoid is nonlinear, but at very positive or negative inputs its derivative approaches zero. Deep chains of such derivatives can contribute to **vanishing gradients**. ReLU avoids positive-side saturation but can have permanently inactive (“dead”) units.
`},
    {id:'mlp',module:'neural',title:'Multilayer networks & matrix shapes',time:12,level:'Core',tags:['mlp','deep','shapes','vectors'],sources:[['nn1','24–34'],['nn2','2–3, 9']],overview:'A network is a composition of neuron layers, not a magical new operation.',content:`
## Architecture
An MLP (multilayer perceptron) has input features, one or more **hidden layers**, and an output layer. The input layer is usually a conduit for values, not a computational layer. Hidden units compute learned intermediate representations and pass them through nonlinear activations.

[[demo:network]]

## Single-example vector convention
Let a<sup>(0)</sup> ∈ ℝ<sup>d</sup> be a column vector of d input features. A layer with m outputs can use W ∈ ℝ<sup>m×d</sup> and b ∈ ℝ<sup>m</sup>:
<div class="formula">z<sup>(1)</sup> = W<sup>(1)</sup> a<sup>(0)</sup> + b<sup>(1)</sup> <br> a<sup>(1)</sup> = φ(z<sup>(1)</sup>)</div>

Each **row** of W is the weights of one neuron. If you choose row vectors instead, you may see xW or Wᵀx in lecture notes. Both conventions work when shapes are consistent; **transpose is not inherently part of a vector dot product**.

## Mini-batches
For B samples represented as rows, X ∈ ℝ<sup>B×d</sup>, W ∈ ℝ<sup>d×m</sup> and b ∈ ℝ<sup>m</sup>, a common layout is Z=XW+b. Bias is **broadcast** across B rows; it is not learned separately for each sample.

## Shallow versus deep
A shallow neural network generally means one (or a small number of) hidden layer(s), while “deep” emphasizes more sequential representation-learning layers. Precise counting conventions vary. Depth can represent compositional structure, but more layers are not automatically better.

> [Explain] A neuron computes a dot product plus bias, but a network layer uses **matrix–vector** or **matrix–matrix multiplication** to compute many neuron outputs efficiently. The operation depends on input and weight shapes.
`},
    {id:'backprop',module:'neural',title:'Forward pass & backpropagation',time:15,level:'Core',tags:['chain-rule','gradients','forward','backward'],sources:[['nn2','4–13'],['imagecnn','36–37']],overview:'How gradients assign credit or blame to every layer.',content:`
## Forward pass
Compute activations from the input through each layer and end with a prediction. Then compare prediction with target using a loss L. Example: for a two-layer network, a₁=φ(W₁x+b₁), ŷ=g(W₂a₁+b₂), L=L(ŷ,y).

## Backward pass
The gradient of L with respect to a weight is calculated by the **chain rule**. Intermediate activations influence later activations, so derivatives multiply along the computational graph. This solves the lecture's “blame game”: hidden neurons do not have explicit desired labels, but their influence on the final loss is differentiable.

<div class="formula">∂L/∂W₁ = (∂L/∂a₁) · (∂a₁/∂z₁) · (∂z₁/∂W₁)</div>

The expression is schematic; in vector/matrix networks these factors are Jacobians or efficiently implemented vector–Jacobian products.

## A concrete scalar chain
Suppose x=2, first layer z₁=w₁x, activation a₁=z₁², output ŷ=w₂a₁, and L=½(ŷ−y)². Then:
<div class="formula">∂L/∂w₂ = (ŷ−y) a₁ <br> ∂L/∂w₁ = (ŷ−y) · w₂ · (2z₁) · x</div>

These derivatives say how changing each parameter affects the final loss. An optimizer then updates the parameters, e.g. w ← w−η∂L/∂w.

## The two phases are distinct
1. **Forward:** calculate and cache values needed for derivatives.
2. **Backward:** propagate derivatives through operations in reverse order.
3. **Optimizer step:** update parameters; typically clear or reset accumulated gradients appropriately before the next step.

> [Explain] Backpropagation is **not** the same as gradient descent. Backprop computes a gradient efficiently; gradient descent or Adam decides how weights should move using that gradient.

## Shapes matter
For a dense layer z=Wx+b, with gradient δ=∂L/∂z, one sample has ∂L/∂W = δ xᵀ and ∂L/∂b=δ. This is an **outer product**, not a vector dot product.
`},
    {id:'nn-losses',module:'neural',title:'Neural-network loss functions',time:11,level:'Core',tags:['mse','cross-entropy','hinge'],sources:[['nn2','11–13'],['regression','5–6']],overview:'A loss tells the optimizer exactly what a mistake means.',content:`
## A loss is a mathematical preference
The network's objective is to minimize the expected or empirical loss over examples. Choosing the loss is part of defining the task and often determines the most suitable output activation.

<div class="formula">MSE = (1/n) Σ (yᵢ−ŷᵢ)² <br> MAE = (1/n) Σ |yᵢ−ŷᵢ| <br> BCE = −[y log p + (1−y)log(1−p)]</div>

## Common loss families
- **Zero–one loss:** 0 for correct class, 1 for wrong class; useful for describing classification error but hard to optimize directly with derivatives.
- **Hinge:** margin penalty max(0, 1−ys), y ∈ {−1,+1}.
- **Logistic / cross-entropy:** smooth probability-oriented penalty.
- **Exponential:** exp(−ys), a strong penalty for some badly classified cases.
- **Squared:** (y−ŷ)², standard in many regression tasks.

## One-hot versus integer labels
With softmax and cross-entropy, an exclusive class y may be represented as a one-hot vector (0,0,1,0) or an integer index (2). Libraries often offer separate “categorical” and “sparse categorical” losses for these encodings; their underlying objective can be the same.

> [Explain] An **activation** determines how a raw network score is transformed; a **loss** evaluates the transformed prediction relative to the target. They work together but are not interchangeable.

## A useful derivative result
For softmax logits with cross-entropy (under the usual formulation), the derivative with respect to logit z<sub>k</sub> simplifies to **p<sub>k</sub>−y<sub>k</sub>**. This is one reason the pairing is convenient computationally.
`},
    {id:'nn-optimization',module:'neural',title:'SGD, mini-batches, momentum & Adam',time:12,level:'Core',tags:['optimizer','momentum','adam','batch'],sources:[['nn2','17–23, 31–32'],['lab','5–6']],overview:'How gradients become reliable parameter updates in large networks.',content:`
## Training loop anatomy
One **epoch** is a complete pass through the training dataset (assuming each sample is visited once). A **mini-batch** is a subset used for one gradient estimate and usually one optimizer step. For N=1,000 and batch size B=100, an epoch normally has **10 update steps**.

## Update families
**Full gradient descent** computes a gradient using all N samples. **SGD** uses one sample. **Mini-batch SGD** estimates the gradient from a manageable batch; its noise is often useful and its parallelism makes it efficient on accelerators.

**Momentum** adds an exponentially weighted history of update directions. In a simple convention:
<div class="formula">vₜ = μ vₜ₋₁ + gₜ ; &nbsp; θₜ₊₁ = θₜ − η vₜ</div>

Here gₜ is the gradient and μ∈[0,1) controls persistence; conventions with different scaling are also common.

**Adam** uses moving estimates of both the first moment and the second uncentered moment of gradients. With bias corrections, it adapts the effective step sizes of parameters. It is used by the CNN lab with a learning rate of 0.001.

## Common convergence difficulties
Learning-rate instability, poor initialization, unsuitable input scaling, local curvature/saddle points, and vanishing/exploding gradients can slow or derail training. Deep architectures may benefit from normalization, skip connections, tuned activations and careful initialization.

> [Explain] A “batch size of 64” does **not** mean 64 epochs; it means 64 training examples per (usually) one gradient update. An epoch and an optimization step measure different things.
`},
    {id:'nn-regularization',module:'neural',title:'Regularization, dropout & failure modes',time:13,level:'Core',tags:['overfitting','l1','l2','dropout','vanishing'],sources:[['nn2','14–20, 24–34'],['imagecnn','38–39']],overview:'Making a network generalize instead of memorizing its training cases.',content:`
## Parameter penalties
**L2 regularization** adds λ‖W‖₂², discouraging large weights. **L1 regularization** adds λ‖W‖₁, encouraging sparse weights. Their optimization behavior differs; neither is a universal winner. Normalize the exact penalty according to the chosen implementation.

## Dropout
During **training**, dropout randomly zeros selected activations (with a specified probability). With inverted dropout, kept activations are rescaled during training; inference uses all units without random dropping. It discourages certain co-adaptations, though it is not universally helpful in every architecture.

## Early stopping
Track validation loss while fitting. Stop when improvement has stalled and restore the best validated model weights according to the chosen policy. This is often simpler and cheaper than expanding the architecture indefinitely.

## Vanishing and exploding gradients
Backprop multiplies derivatives across layers. Products of small magnitudes can vanish, making early layers learn slowly; products of large magnitudes can explode, producing unstable updates. ReLU-family activations, residual connections, clipping and careful initialization are among common remedies.

## Bias–variance connection
Underfitting can follow from excessive regularization or insufficient representation capacity. Overfitting may follow from overly flexible fitting to a small/noisy dataset. Choose complexity based on validation evidence, not the number of layers alone.

> [Explain] The lecture links smaller weights to Occam's razor: prefer simpler functions when possible. “Small weights” is only a proxy for simplicity; it interacts with feature scaling and architecture.
`},
    {id:'nn-exercises',module:'neural',title:'Neural-network worked exercises',time:12,level:'Tutorial',tags:['sigmoid','matrix','tutorial'],sources:[['nntut','1–4']],overview:'Three tutorial calculations with shape checks and numerical results.',content:`
## Tutorial 03 — Question 1: one neuron
Given w=[0.44, 0.10, 0.38, 0.59], x=[0.77, 0.67, 0.12, 0.62], b=0.89, and a sigmoid with slope parameter a=1:
<div class="formula">z = Σwᵢxᵢ + b = 1.7072 <br> σ(z)=1/(1+e<sup>−1.7072</sup>)≈0.8464</div>

## Question 2: one neuron
w=[0.5,0.3,0.2], x=[0.6,0.8,0.5], b=0.1:
<div class="formula">z = 0.5(0.6)+0.3(0.8)+0.2(0.5)+0.1 = 0.74 <br> σ(0.74) ≈ 0.6770</div>

## Question 3: two output neurons
Row-vector convention: x=[1,2], W=[[0.1,0.2],[0.3,0.4]], b=[0.1,0.2]. Compute xW+b:
<div class="formula">xW = [1(0.1)+2(0.3), 1(0.2)+2(0.4)] = [0.7,1.0] <br> z = [0.8,1.2] <br> σ(z) ≈ [0.6900, 0.7685]</div>

> [Explain] The two outputs in Question 3 apply sigmoid **independently**; they do not need to add up to 1. Applying **softmax** to [0.8,1.2] would instead create a two-class exclusive distribution of roughly [0.4013, 0.5987].

> [Exam lens] Always write the input and weight shapes before multiplying. Question 3 uses the row-vector convention xW+b; transposing W yields the corresponding column-vector convention.
`},

    {id:'images-as-tensors',module:'cnn',title:'Images, tensors & spatial structure',time:11,level:'Core',tags:['pixels','rgb','channels','cnn'],sources:[['cnn','2–9'],['imagecnn','4–15']],overview:'Why local pixel neighborhoods matter more than a bag of numbers.',content:`
## A computer sees numbers
An 8-bit grayscale image H×W contains H·W intensities, usually 0…255. An RGB image adds three channels (red, green, blue), so H×W×3 values. An MNIST 28×28 grayscale digit has **784** pixels; a CIFAR-10 color image has shape **32×32×3**.

The image-classification slides cite MNIST's standard 60,000 training / 10,000 test examples and CIFAR-10's 50,000 training / 10,000 test split across ten classes. Those are dataset descriptions, not guaranteed performance numbers for your implementation.

## Spatial structure
Neighboring pixels together form edges, textures and shapes. Flattening an image into a long vector preserves all numbers but does **not make locality explicit** in the model. A dense MLP can still learn visual patterns, but it starts with many connections and less useful spatial inductive bias.

## Why CNNs are different
A CNN typically uses **local receptive fields** and **shared filter weights** across spatial positions. These assumptions make the same feature detector reusable at many image locations and reduce parameter count compared with connecting every pixel to every hidden neuron.

[[demo:pixels]]

> [Explain] Convolution doesn't magically understand “cats.” Early filters learn local structures; deeper layers can combine them into increasingly abstract representations. The architecture helps, but learning still depends on the dataset and objective.

## Hand-crafted features versus learned features
Older image pipelines may measure texture descriptors, image histograms, local binary patterns, or shape moments before feeding an SVM or another classifier. CNNs learn many such task-relevant filters automatically through end-to-end training.
`},
    {id:'convolution',module:'cnn',title:'Convolution, kernels & feature maps',time:14,level:'Core',tags:['kernel','filter','feature-map','weight-sharing'],sources:[['cnn','9–26'],['imagecnn','17–25'],['lab','1–2']],overview:'Slide a shared filter across a signal to produce a feature map.',content:`
## Sliding weighted windows
For a 2D single-channel input X and a small kernel K of size F<sub>h</sub>×F<sub>w</sub>, each output position is a weighted sum of nearby pixel values (often plus bias):
<div class="formula">Y[i,j] = Σ<sub>u,v</sub> K[u,v] X[i+u, j+v] + b</div>

Most deep-learning libraries call this operation **convolution**, although the no-kernel-flip formula is technically **cross-correlation**, as the CNN lecture points out.

## Core vocabulary
- **Kernel / filter:** shared learned weights applied to local windows.
- **Receptive field:** region of input influencing one output location.
- **Feature map:** outputs produced by one filter across positions.
- **Weight sharing:** same filter coefficients at every position.
- **Sparse connectivity:** an output location receives a local region, not the entire image.

[[demo:conv]]

## Multi-channel filters
An RGB input has three channels. One ordinary convolution filter spans **all three input channels** (e.g., 3×3×3), sums contributions, and produces **one output channel**. With F filters, the output has F channels.

For a Conv2D layer using K×K spatial kernels, C<sub>in</sub> input channels and C<sub>out</sub> filters, parameter count with one bias per filter is:
<div class="formula">Parameters = (K² · C<sub>in</sub> + 1) · C<sub>out</sub></div>

Example from the lab: (3²·3+1)·32 = **896** trainable parameters for its first convolutional layer.

> [Explain] Each filter is learned—not manually fixed as a classical edge detector—though visualizing learned filters often reveals edge/texture-like patterns. Filters are shared across positions, not across input channels.
`},
    {id:'cnn-shapes',module:'cnn',title:'Stride, padding & output dimensions',time:12,level:'Core',tags:['stride','padding','shape','filters'],sources:[['cnn','27–34'],['lab','1–2']],overview:'Compute feature-map shapes and parameter counts without guessing.',content:`
## Output-size formula
For a 1D input width W, filter size F, padding P on both sides, stride S and dilation D=1:
<div class="formula">W<sub>out</sub> = ⌊(W + 2P − F)/S⌋ + 1</div>

Apply the same calculation to height separately. With dilation D>1, replace F by effective size D(F−1)+1. The output depth equals the **number of filters**.

## Examples from the convolution slides
- 7×7 input, 3×3 filter, no padding, S=1 → **5×5**.
- Same input and filter, S=2 → **3×3**.
- Same input and filter, S=3 → **2×2** (use floor).
- 7×7, F=3, S=1, P=1 → **7×7**.

[[demo:convshape]]

## “Same” versus “valid”
**Valid** means no padding. **Same** generally chooses padding to preserve size for stride 1 (or roughly ceil(input/stride) for larger strides, depending on the library). **Stride** skips positions; **padding** adds border values; neither changes how many *different sets of learned weights* a filter has.

## Parameter count versus output size
Convolution reuses one filter at all output positions. A convolution's **number of parameters** depends on filter dimensions and channel counts, **not directly on image width or height**. However, computation and activation memory depend strongly on output spatial size.

> [Exam lens] Write four things in order: input (H,W,C<sub>in</sub>), kernel F, stride S, padding P, then filter count C<sub>out</sub>. Determine H<sub>out</sub>, W<sub>out</sub>, C<sub>out</sub>, and the parameter count separately.
`},
    {id:'cnn-architecture',module:'cnn',title:'Pooling, layers & classic CNNs',time:12,level:'Core',tags:['pooling','lenet','alexnet','vgg','resnet'],sources:[['cnn','35–44'],['imagecnn','23–34, 52–59']],overview:'How CNN blocks build progressively useful image representations.',content:`
## A common block
A typical CNN stacks **convolution → activation (such as ReLU) → optional pooling**, repeating this pattern and ending in a classifier. Many modern networks instead downsample using strided convolutions and may replace flatten+dense stacks with global average pooling.

## Pooling
**Max pooling** keeps the maximum from a local window; **average pooling** keeps its mean. Both reduce resolution without learning convolutional weights in the pooling operation itself. A 2×2 pooling window with stride 2 typically halves each spatial dimension when it fits exactly.

## Flattening and dense layers
Flatten concatenates feature maps into a vector. A fully connected layer then combines these features globally. If its input vector has d entries and output m units, a dense layer with bias has **dm+m parameters**—sometimes far more than the convolutional layers.

## Important model families from the slides
- **LeNet-5:** early CNN for handwritten character recognition.
- **AlexNet (2012):** showed a major large-scale ImageNet success; used GPUs and ReLU.
- **VGG (2014):** repeated small 3×3 filters in deeper, regular blocks.
- **GoogLeNet / Inception:** combines multiple receptive-field scales within modules.
- **ResNet (2015):** introduces skip/residual connections, helping train much deeper networks.
- **Squeeze-and-Excitation networks:** adaptively reweight channel responses.

> [Explain] A residual block learns a modification F(x) and adds input x: **output = F(x)+x** (when shapes match). This creates a more direct gradient pathway than a purely sequential chain.

## Parameter trap
Pooling has **zero learned parameters** in a standard max/average pooling layer, even though its output contains thousands of numbers. Activation count and parameter count are different quantities.
`},
    {id:'cnn-training',module:'cnn',title:'Training, augmentation & transfer learning',time:12,level:'Core',tags:['cnn','dropout','transfer','fine-tuning'],sources:[['cnn','45–46'],['imagecnn','35–49'],['lab','3–7']],overview:'Practical CNN learning from examples and pretrained representations.',content:`
## A training loop for image classification
Prepare input tensors and integer/one-hot labels; run forward passes; compute cross-entropy; backpropagate; update weights; track training and validation loss/accuracy; evaluate once on the final test split. A CNN learns both local feature extractors and a classifier through the objective.

## Regularization in vision
**Image augmentation** can apply label-preserving transformations such as crops, flips or brightness changes when appropriate. **Dropout**, **weight decay**, **early stopping** and more training data can improve generalization. But an augmentation must preserve the true label: flipping a handwritten 6 may change its meaning.

## Transfer learning strategies
1. Load weights pretrained on a related dataset.
2. Replace the final classification head with one matching target classes.
3. Freeze most of the feature extractor and train the new head.
4. Optionally unfreeze some layers and **fine-tune** at a suitable learning rate.

The lectures illustrate pretrained ImageNet models and fine-tuning. Benefits vary with domain similarity; medical scans, satellite imagery and natural images may need different adaptation choices.

## Detecting overfitting
If training accuracy continues rising but validation accuracy levels off or declines, compare the loss curves and inspect dataset leakage, class imbalance and training settings before concluding. Validation loss may worsen before validation accuracy changes.

> [Explain] Freezing a pretrained network uses its existing representations as fixed features. Fine-tuning changes those representations with new gradients. Both are called forms of transfer learning, but their training costs and risks differ.
`},
    {id:'cnn-lab',module:'cnn',title:'CIFAR-10 CNN lab, explained layer-by-layer',time:15,level:'Tutorial',tags:['cifar10','keras','parameters','lab'],sources:[['lab','1–8'],['imagecnn','8, 16–30']],overview:'Walk through the lab’s entire architecture, tensor shapes and training procedure.',content:`
## Data and target
The lab uses CIFAR-10: 32×32 RGB inputs with 10 exclusive classes. Its code normalizes pixel values by dividing by 255, uses sparse categorical cross-entropy for **integer class IDs**, and reports accuracy.

## Architecture in the supplied lab
<table class="study-table"><tr><th>Layer / block</th><th>Output shape (batch omitted)</th><th>Trainable parameters</th></tr><tr><td>Input</td><td>32×32×3</td><td>0</td></tr><tr><td>Conv 3×3, 32, same</td><td>32×32×32</td><td>896</td></tr><tr><td>Conv 3×3, 32, same</td><td>32×32×32</td><td>9,248</td></tr><tr><td>MaxPool 2×2 + Dropout .25</td><td>16×16×32</td><td>0</td></tr><tr><td>Conv 3×3, 64, same</td><td>16×16×64</td><td>18,496</td></tr><tr><td>Conv 3×3, 64, same</td><td>16×16×64</td><td>36,928</td></tr><tr><td>MaxPool 2×2 + Dropout .25</td><td>8×8×64</td><td>0</td></tr><tr><td>Flatten</td><td>4,096</td><td>0</td></tr><tr><td>Dense 256 + Dropout .5</td><td>256</td><td>1,048,832</td></tr><tr><td>Dense 10, softmax</td><td>10</td><td>2,570</td></tr><tr><th>Total</th><th></th><th>1,116,970</th></tr></table>

## Why does the dense layer dominate?
Flatten maps 8×8×64 to 4,096. The dense layer then needs **4,096×256+256 = 1,048,832 parameters**. That is most of the network. Convolution is economical because weights are shared spatially; fully connected layers are not.

## Compile, train and evaluate
The lab compiles with **Adam (learning rate 0.001)**, <code>sparse_categorical_crossentropy</code> and accuracy. It trains **15 epochs**, **batch size 64**, with **validation_split=0.1**, then evaluates the held-out CIFAR-10 test set.

> [Explain] The 10-way softmax returns values summing to 1. <code>argmax</code> selects the predicted class index. An example's highest softmax value is a model confidence score, not proof that the model is well calibrated.

## What the learning curves show
Plot training and validation accuracy/loss against epochs to spot divergence. For a proper final report, also include confusion matrix/per-class metrics where classes are imbalanced or errors have different costs.
`},

    {id:'map-models',module:'revision',title:'Which algorithm should I use?',time:10,level:'Revision',tags:['comparison','model-selection','decision'],sources:[['basics','24–44'],['classification','16–47'],['regression','4–14']],overview:'A compact decision map connecting all the techniques in the lecture collection.',content:`
## Start from the output, not the algorithm name
**A number:** regression (linear, polynomial, ridge, lasso, NN regression). **One category:** classification (logistic, k-NN, tree, NB, SVM, NN). **Unlabeled groups:** clustering (k-means, hierarchical, DBSCAN). **Sequential behavior with rewards:** reinforcement learning. **Images:** CNNs are often a strong baseline, potentially using transfer learning.

<table class="study-table"><tr><th>Model</th><th>Core idea</th><th>Important trade-off</th></tr><tr><td>Linear regression</td><td>Weighted sum predicts value</td><td>Simple, interpretable; limited without feature engineering</td></tr><tr><td>k-NN</td><td>Nearby examples vote</td><td>Easy setup; slow queries and scale sensitivity</td></tr><tr><td>Decision tree</td><td>Nested feature questions</td><td>Interpretable; can overfit</td></tr><tr><td>Naïve Bayes</td><td>Posterior from feature likelihoods</td><td>Efficient; independence assumption</td></tr><tr><td>SVM</td><td>Maximum-margin boundary</td><td>Convex objective; kernels can be costly</td></tr><tr><td>k-means</td><td>Fit k centroids</td><td>Simple; assumes suitable cluster geometry</td></tr><tr><td>MLP</td><td>Composed nonlinear layers</td><td>Expressive; needs tuning and data</td></tr><tr><td>CNN</td><td>Shared local image filters</td><td>Good spatial inductive bias; training cost</td></tr></table>

## Five diagnostic questions
1. Is labeled data available?
2. Is the target categorical, numeric, structural or sequential?
3. How many samples and features, and how noisy are they?
4. Do we need interpretability, quick predictions, low memory or strong accuracy?
5. Which loss and validation protocol reflect the real application?

> [Exam lens] Names are not enough: describe a method's **inputs**, **learned representation**, **objective**, **prediction rule**, and **main limitations**.
`},
    {id:'clustering',module:'unsupervised',title:'Clustering: k-means & hierarchical',time:13,level:'Core',tags:['kmeans','elbow','dendrogram','hierarchical'],sources:[['clustering','1–13'],['basics','33–35']],overview:'Group unlabeled samples by similarity, with important metric caveats.',content:`
## What clustering does
Clustering partitions or groups unlabeled data so that points within groups are more similar than points across groups according to a chosen definition. **Hard clustering** assigns one cluster per point; **soft clustering** assigns fractional or probabilistic memberships.

## k-means algorithm
1. Choose a number of clusters k.
2. Initialize k centroids (preferably k-means++ or another robust initializer).
3. Assign every point to its nearest centroid, usually by squared Euclidean distance.
4. Update each centroid to the **arithmetic mean** of assigned points.
5. Repeat until assignments/centroids stabilize or a stopping rule is reached.

<div class="formula">Objective: Σ<sub>i=1…n</sub> ‖xᵢ−μ<sub>c(i)</sub>‖₂²</div>

[[demo:kmeans]]

> [Clarification] The clustering slides say “calculate the variance and place a new centroid,” but the standard k-means centroid update is the **mean**. Their worked distance table uses Manhattan distance; this is a valid distance-ranking exercise, but combining L1 assignment with a **mean** update is not standard Euclidean k-means. Coordinate-wise **medians** minimize L1 deviations.

## Choosing k
The **elbow method** plots within-cluster sum of squares against k and looks for diminishing returns. **Silhouette score** compares a point's average within-cluster distance a with distance b to the nearest other cluster: (b−a)/max(a,b). Neither is infallible; domain constraints matter.

## Hierarchical clustering
**Agglomerative:** start with one cluster per point and merge progressively. **Divisive:** start with all points together and split recursively. A **dendrogram** shows merge levels. With **single linkage**, the distance between two clusters is the minimum pairwise member distance; complete linkage uses the maximum and average linkage uses an average.

## Other families from the lecture map
**DBSCAN** groups density-connected samples and can mark noise; **Gaussian mixture models** offer probabilistic soft assignments. These differ from k-means in assumptions and output.
`},
    {id:'kmeans-tutorial',module:'unsupervised',title:'k-means: the worked clustering table',time:11,level:'Tutorial',tags:['worked','centroids','manhattan'],sources:[['clustering','6–10']],overview:'Reconstruct the slide’s eight-point assignment table and the centroid subtlety.',content:`
## Data and initial centers
The clustering lecture lists eight samples:
A₁=(2,10), A₂=(2,5), A₃=(8,4), A₄=(5,8), A₅=(7,5), A₆=(6,4), A₇=(1,2), A₈=(4,9).

Initial centers are C₁=A₁=(2,10), C₂=A₄=(5,8), C₃=A₇=(1,2). The worksheet explicitly computes **Manhattan** distance |x₂−x₁|+|y₂−y₁| for this first assignment step.

## First assignment round (from the lecture)
<table class="study-table"><tr><th>Point</th><th>To C₁</th><th>To C₂</th><th>To C₃</th><th>Nearest</th></tr><tr><td>A₁</td><td>0</td><td>5</td><td>9</td><td>C₁</td></tr><tr><td>A₂</td><td>5</td><td>6</td><td>4</td><td>C₃</td></tr><tr><td>A₃</td><td>12</td><td>7</td><td>9</td><td>C₂</td></tr><tr><td>A₄</td><td>5</td><td>0</td><td>10</td><td>C₂</td></tr><tr><td>A₅</td><td>10</td><td>5</td><td>9</td><td>C₂</td></tr><tr><td>A₆</td><td>10</td><td>5</td><td>7</td><td>C₂</td></tr><tr><td>A₇</td><td>9</td><td>10</td><td>0</td><td>C₃</td></tr><tr><td>A₈</td><td>3</td><td>2</td><td>10</td><td>C₂</td></tr></table>

The groups are now C₁={A₁}, C₂={A₃,A₄,A₅,A₆,A₈}, C₃={A₂,A₇}.

## A subtle but important algorithm distinction
If we **switch to arithmetic-mean centroid updates**, the new centers are (2,10), (6,6), and (1.5,3.5). However, arithmetic means optimize squared Euclidean distance, whereas the worksheet used Manhattan distance for assignments.

If we strictly minimize total coordinate-wise absolute error, **medians**, not means, are appropriate representatives. For C₂, a coordinate-wise median is (6,5). For C₃, any coordinate-wise median within [1,2]×[2,5] is valid for these two points.

> [Clarification] The first distance table is useful for practicing Manhattan distances and nearest-center assignments. Do not silently treat its complete procedure as the standard **Euclidean k-means** algorithm; distance and centroid-update rules must be compatible.
`},
    {id:'unsupervised-families',module:'unsupervised',title:'Associations & representation learning',time:9,level:'Extension',tags:['unsupervised','pca','associations'],sources:[['basics','33–36'],['clustering','2–4']],overview:'Unsupervised learning is wider than assigning clusters.',content:`
## Beyond k-means
The basics lectures list **clustering**, **association discovery**, **distribution estimation** and **dimensionality reduction** as unsupervised learning tasks. Each learns about the structure of X without an explicit target y.

## Association rules
Market-basket analysis looks for co-occurring items. For an implication A → B, **support** measures the fraction of transactions containing both A and B; **confidence** measures the fraction of A-transactions also containing B. **Lift** compares that confidence with how common B already is.
<div class="formula">support(A→B) = P(A∩B) <br> confidence(A→B) = P(B|A) <br> lift(A→B) = P(B|A)/P(B)</div>

> [Explain] A high-confidence rule does not prove causal influence. If B is almost always purchased anyway, confidence may be high even when A offers little information; lift helps reveal that baseline effect.

## Dimensionality reduction
Instead of selecting existing features, dimensionality reduction creates a lower-dimensional representation. **PCA** finds orthogonal directions capturing maximal sample variance (after appropriate centering). The first principal component is a unit direction of maximum projected variance, the next is orthogonal to it and captures the next-most variance, and so forth.

Reducing features can enable visualization, compression or noise reduction, but unsupervised variance directions do **not** necessarily capture the most predictive features for a target you may care about later.

## Distribution models
A **Gaussian mixture model** assumes a weighted combination of Gaussian components and usually estimates *soft* component memberships; this contrasts with standard k-means' hard assignments. A model can cluster well under one similarity criterion but poorly under another.
`},
    {id:'formula-sheet',module:'revision',title:'High-yield formula sheet',time:8,level:'Revision',tags:['formulas','cheatsheet','exam'],sources:[['dist','1–5'],['regtut','1–7'],['svm','17–34'],['nn1','26–32'],['cnn','31–34']],overview:'The essential expressions gathered into one readable reference.',content:`
## Distances
<div class="formula">L₂(a,b)=√Σ(aᵢ−bᵢ)² &nbsp; · &nbsp; L₁(a,b)=Σ|aᵢ−bᵢ| <br> L∞(a,b)=max|aᵢ−bᵢ| &nbsp; · &nbsp; cos(a,b)=(a·b)/(‖a‖‖b‖)</div>

## Regression
<div class="formula">ŷ=β₀+β₁x &nbsp; · &nbsp; β₁=Σ(x−x̄)(y−ȳ)/Σ(x−x̄)² <br> β₀=ȳ−β₁x̄ &nbsp; · &nbsp; SSE=Σ(y−ŷ)² &nbsp; · &nbsp; MSE=SSE/n <br> RMSE=√MSE &nbsp; · &nbsp; R²=1−SSE/TSS</div>

## Classification
<div class="formula">Precision=TP/(TP+FP) &nbsp; · &nbsp; Recall=TP/(TP+FN) <br> Specificity=TN/(TN+FP) &nbsp; · &nbsp; F1=2PR/(P+R) <br> H(Y)=−Σ pₖlog₂pₖ &nbsp; · &nbsp; Gain=H(parent)−weighted H(children) <br> P(C|X)∝P(C)∏P(xⱼ|C)</div>

## Support vector machines
<div class="formula">f(x)=wᵀx+b &nbsp; · &nbsp; Hard margin: min ½‖w‖² <br> subject to yᵢf(xᵢ)≥1 &nbsp; · &nbsp; Full margin=2/‖w‖ <br> Hinge=max(0,1−yf(x)) &nbsp; · &nbsp; Soft: min ½‖w‖²+CΣξᵢ</div>

## Neural networks
<div class="formula">z=Wx+b &nbsp; · &nbsp; a=φ(z) &nbsp; · &nbsp; σ(z)=1/(1+e<sup>−z</sup>) <br> ReLU(z)=max(0,z) &nbsp; · &nbsp; softmax(z)ᵢ=e<sup>zᵢ</sup>/Σe<sup>zⱼ</sup> <br> θ←θ−η∇J(θ)</div>

## Convolutions
<div class="formula">Output width=⌊(W+2P−F)/S⌋+1 <br> Parameters=(F²·C<sub>in</sub>+1)·C<sub>out</sub> (with bias)</div>

> [Exam lens] A formula is only useful when you know its conventions. In particular: positive class in confusion matrices, how RSS is named, row versus column vector layouts, full versus half SVM margin, and whether CNN padding is “same” or “valid.”
`},
    {id:'common-pitfalls',module:'revision',title:'Exam pitfalls & clarifications',time:10,level:'Revision',tags:['pitfalls','corrections','checks'],sources:[['svm','8, 31'],['clustering','6, 10'],['regression','12'],['nn2','8'],['cnn','10, 31–34']],overview:'Places where similar-looking terms and slide shortcuts cause mistakes.',content:`
## 1. Linear does not always mean straight-looking
Polynomial regression is linear **in coefficients** even if the curve is nonlinear in the original input. A kernel SVM is linear in feature space but nonlinear in original space.

## 2. “Regression” in logistic regression
It generally solves classification by modeling log-odds. Ordinary linear regression instead predicts numeric values without constraining them to (0,1).

## 3. k-means is not k-NN
k-means: no labels, k **centroids**. k-NN: labeled stored samples, k **neighbors**.

## 4. SVM: big C ≠ big regularization
With the standard soft-margin objective ½‖w‖² + CΣξ, **large C penalizes violations strongly**. This corrects the direction printed in the SVM slide deck's C note.

## 5. CNN “convolution” usually means cross-correlation
The kernel is not flipped in the common deep-learning forward operation. The convolution lecture explicitly mentions this naming convention.

## 6. Transpose is a shape choice
For row x and a d×m weight matrix W, output is xW+b. For column x and m×d weights W, output is Wx+b. Do not insert a transpose without declaring orientation.

## 7. Cost, loss, metric, and gradient
Loss evaluates a prediction. Cost/objective aggregates losses and regularizers. A metric reports performance. A gradient is a derivative of an objective, not itself an error.

## 8. Dataset split leakage
Fit learned scalers/imputers on training data only. The test set is not an iterative tuning set.

## 9. R² is not accuracy
R² compares squared regression error with a mean baseline; it does not mean “89% of the individual predictions are correct.”

## 10. Conv parameters do not grow with output pixels
With shared filters, parameter count depends on filter size and channels, while activation count depends on spatial dimensions.
`}
  ],
  exercises:[
    {id:'q1',lesson:'what-is-ml',question:'For a spam filter, which quantity is the “experience E” in the T–P–E definition?',options:['The percentage of detected spam','A collection of previously labeled emails','The word “spam”','The trained model weights'],correct:1,explain:'E is what the system learns from. The performance measure P could be recall, false-positive rate, or a suitable metric.'},
    {id:'q2',lesson:'paradigms',question:'Which setting learns a policy from delayed rewards?',options:['Regression','Clustering','Reinforcement learning','One-hot encoding'],correct:2,explain:'RL learns action selection over time, using reward feedback that may be delayed.'},
    {id:'q3',lesson:'ml-pipeline',question:'A scaler is fitted on the entire dataset before splitting. What is the main concern?',options:['Vanishing gradients','Data leakage','Softmax saturation','Excessive filter size'],correct:1,explain:'Estimated preprocessing statistics contain information from validation/test data.'},
    {id:'q4',lesson:'data-prep',question:'Why would k-NN usually need feature scaling?',options:['It learns no weights','Distance is sensitive to units','It uses softmax','All features must be binary'],correct:1,explain:'A numerically large scale can dominate a Euclidean/Manhattan distance calculation.'},
    {id:'q5',lesson:'train-test',question:'Training loss falls but validation loss rises over many epochs. The likely issue is:',options:['Overfitting','Guaranteed improvement','Clustering','No gradient'],correct:0,explain:'A growing generalization gap suggests overfitting or a distribution mismatch; investigate leakage and splitting too.'},
    {id:'q6',lesson:'metrics-intro',question:'TP=20, FP=5, FN=10. What is precision?',options:['20/30','20/25','25/30','5/20'],correct:1,explain:'Precision is TP/(TP+FP) = 20/25 = 0.8.'},
    {id:'q7',lesson:'distance',question:'A=(2,3), B=(7,9). Manhattan distance?',options:['6','11','√61','1'],correct:1,explain:'|7−2| + |9−3| = 5+6 = 11.'},
    {id:'q8',lesson:'regression-basics',question:'A simple least-squares regression uses which objective?',options:['Maximize margin','Minimize sum of squared residuals','Maximize entropy','Minimize cosine distance only'],correct:1,explain:'Ordinary least squares fits coefficients minimizing SSE.'},
    {id:'q9',lesson:'regression-quality',question:'Tutorial 02 fits ŷ = −1 + 2.5x. Predict y at x=4.',options:['7','8','9','10'],correct:2,explain:'−1 + 2.5·4 = 9.'},
    {id:'q10',lesson:'regression-families',question:'Which regression penalty can set coefficients exactly to zero?',options:['Ridge/L2','Lasso/L1','Adding an intercept','MSE alone'],correct:1,explain:'L1 regularization can encourage sparse coefficients; ridge usually shrinks without exact zeros.'},
    {id:'q11',lesson:'learning-optimization',question:'What is the usual gradient descent step?',options:['θ←θ+η∇J','θ←θ−η∇J','θ←∇J/η','θ←J(θ)'],correct:1,explain:'Subtract the gradient, scaled by learning rate η.'},
    {id:'q12',lesson:'classification-task',question:'One image can be tagged “person,” “bicycle,” and “street” simultaneously. This is:',options:['Binary','Multiclass exclusive','Multilabel','Regression'],correct:2,explain:'Multilabel classification allows multiple labels per sample.'},
    {id:'q13',lesson:'knn',question:'In k-NN, k refers to:',options:['Number of feature dimensions','Number of clusters','Number of nearest labeled samples','Number of training epochs'],correct:2,explain:'k-NN votes among k nearby training examples. k-means uses k for clusters.'},
    {id:'q14',lesson:'decision-trees',question:'ID3 tends to choose the feature with:',options:['Maximum information gain','Maximum number of missing values','Lowest regression slope','Largest SVM margin'],correct:0,explain:'Information gain measures reduction in entropy after splitting.'},
    {id:'q15',lesson:'naive-bayes',question:'The “naïve” assumption is that features are:',options:['Unconditionally independent','Conditionally independent given the class','Always Gaussian','Identically valued'],correct:1,explain:'It assumes independence conditioned on the class label.'},
    {id:'q16',lesson:'classification-evaluation',question:'Recall is:',options:['TP/(TP+FP)','TP/(TP+FN)','TN/(TN+FP)','(TP+TN)/N'],correct:1,explain:'Recall asks which fraction of actual positives were recovered.'},
    {id:'q17',lesson:'svm-hyperplanes',question:'In a two-feature linear classifier, the decision boundary is:',options:['A point','A line','A 3D volume','A parabola necessarily'],correct:1,explain:'wᵀx+b=0 describes a line in 2D, assuming nonzero w.'},
    {id:'q18',lesson:'svm-margin',question:'With canonical hard-margin scaling, the full SVM margin width is:',options:['‖w‖','1/‖w‖','2/‖w‖','2‖w‖'],correct:2,explain:'Margin hyperplanes occur at signed scores +1 and −1, each 1/‖w‖ from the decision boundary.'},
    {id:'q19',lesson:'svm-soft-margin',question:'For ½‖w‖² + CΣξ, increasing C does what?',options:['Decreases penalty for violations','Increases penalty for violations','Always adds features','Removes the bias term'],correct:1,explain:'C multiplies the slack penalty. A larger C makes violations more costly.'},
    {id:'q20',lesson:'svm-kernels',question:'The kernel trick is useful because it:',options:['Avoids any optimization','Computes feature-space dot products without explicit φ(x)','Converts all data to labels','Removes all support vectors'],correct:1,explain:'K(x,z)=φ(x)ᵀφ(z) can be calculated directly for suitable kernels.'},
    {id:'q21',lesson:'neuron',question:'For z=w·x+b, with x and w vectors of equal length, w·x is:',options:['A scalar','A matrix','Always another vector','The bias'],correct:0,explain:'The Euclidean dot product of two equal-length vectors is a scalar.'},
    {id:'q22',lesson:'activations',question:'Which activation yields K nonnegative outputs that sum to 1?',options:['ReLU','Identity','Softmax','Independent sigmoid outputs'],correct:2,explain:'Softmax normalizes logits into a probability distribution over mutually exclusive classes.'},
    {id:'q23',lesson:'mlp',question:'For column x∈ℝᵈ and m output units, W in z=Wx+b is:',options:['d×m','m×d','d×d always','m×m always'],correct:1,explain:'An m×d matrix multiplies a d-vector to produce an m-vector.'},
    {id:'q24',lesson:'backprop',question:'Backpropagation primarily computes:',options:['The best batch size','Parameter gradients using the chain rule','The test split','A unique global minimum'],correct:1,explain:'An optimizer such as SGD or Adam then uses gradients to update parameters.'},
    {id:'q25',lesson:'nn-losses',question:'A typical combination for exclusive multiclass output is:',options:['Softmax + categorical cross-entropy','ReLU + MAE always','Identity + hinge always','Independent sigmoid + mean only'],correct:0,explain:'Softmax probabilities are a standard match for categorical cross-entropy.'},
    {id:'q26',lesson:'nn-optimization',question:'With 1,000 samples and batch size 100, one epoch normally includes:',options:['1 update','10 updates','100 updates','1,000 epochs'],correct:1,explain:'1,000/100 = 10 batches; normally one parameter update per batch.'},
    {id:'q27',lesson:'nn-regularization',question:'Standard dropout during inference usually:',options:['Randomly disables neurons forever','Uses all units without random dropping','Zeros all biases','Adds extra classes'],correct:1,explain:'With the usual inverted-dropout convention, randomness happens during training only.'},
    {id:'q28',lesson:'nn-exercises',question:'For x=[1,2], W=[[.1,.2],[.3,.4]], b=[.1,.2], the preactivation xW+b is:',options:['[.7,1.0]','[.8,1.2]','[1,2]','[.1,.2]'],correct:1,explain:'xW=[.7,1.0] and adding b gives [.8,1.2].'},
    {id:'q29',lesson:'images-as-tensors',question:'How many pixel values are in a 28×28 grayscale MNIST image?',options:['28','56','784','2,352'],correct:2,explain:'28×28×1=784.'},
    {id:'q30',lesson:'convolution',question:'A regular 3×3 RGB convolution filter with bias has how many parameters?',options:['9','10','27','28'],correct:3,explain:'3×3×3 weights plus one bias = 28.'},
    {id:'q31',lesson:'cnn-shapes',question:'7×7 input, 3×3 kernel, stride 2, no padding. Output spatial shape?',options:['5×5','3×3','4×4','7×7'],correct:1,explain:'floor((7−3)/2)+1 = 3 in both dimensions.'},
    {id:'q32',lesson:'cnn-architecture',question:'A standard max-pooling layer usually has:',options:['Learned filter weights','Zero learned parameters','One learned parameter per pixel','A softmax output'],correct:1,explain:'Pooling summarizes local activations but generally learns no weights itself.'},
    {id:'q33',lesson:'cnn-training',question:'Fine-tuning a pretrained CNN means:',options:['Never changing pretrained weights','Updating some or all pretrained weights on new data','Using k-means instead','Replacing all data with random noise'],correct:1,explain:'Freezing uses fixed features; fine-tuning backpropagates into selected pretrained layers.'},
    {id:'q34',lesson:'cnn-lab',question:'Why does the 4,096→256 dense layer contain so many parameters?',options:['Pooling adds weights','Each output connects to every input','Convolution filters are copied for every pixel','There are 256 classes'],correct:1,explain:'4,096×256+256=1,048,832 trainable parameters.'},
    {id:'q36',lesson:'distance-tutorial',question:'For A=(8,−12,4) and B=(11,3,−5), Manhattan distance is:',options:['3','15','27','39'],correct:2,explain:'The coordinate differences have absolute values 3, 15 and 9, totaling 27.'},
    {id:'q37',lesson:'kmeans-tutorial',question:'Which location minimizes the sum of squared Euclidean distances to a cluster’s points?',options:['Arithmetic mean','Coordinate-wise median only','Farthest point','Lowest-value point'],correct:0,explain:'The arithmetic mean is the minimizer of squared Euclidean error; medians minimize absolute deviations.'},
    {id:'q35',lesson:'clustering',question:'In standard Euclidean k-means, the updated centroid is the cluster:',options:['Median','Mean','Farthest point','First point'],correct:1,explain:'The arithmetic mean minimizes within-cluster squared Euclidean distances.'}
  ]
};
