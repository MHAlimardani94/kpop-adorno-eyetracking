# K-pop, Adorno's standardization and webcam eye tracking: analysis notebooks

Analysis code for a PhD thesis that tests one link of Adorno's critique of the culture industry: that the **standardization** of a product's form
organizes in advance how audiences look at it. Standardization is measured at the **product level** with a machine-learning index of visual
similarity among 105 official K-pop music videos (InternVideo2, checked with CLIP and DINOv2, validated against human coding and compared with a
Korean indie reference corpus). It is then tested at the **audience level** with an online webcam eye-tracking study (net gaze convergence, H1a–H1c).

* Preregistration (OSF): https://osf.io/hr6x5
* Repository: https://github.com/MHAlimardani94/kpop-adorno-eyetracking

> \*\*No data, videos or keys are included.\*\* The music videos are copyrighted; participant gaze records and contact data are private;
> the key files that link blind clip names to standardization levels (`clip\_key.xlsx`, `rate\_key.xlsx`) are never published.
> The notebooks are released with all outputs cleared.

## Notebooks and run order

|#|Notebook|What it does|Thesis|
|-|-|-|-|
|1|`01\_product\_index\_InternVideo2.ipynb`|Corpus and per-video extraction (InternVideo2-CLIP-S windows, OpenCV features, PySceneDetect shots, YuNet faces, librosa audio); gender-balanced standardization index and sensitivity versions; saturation of the ranking; Korean indie reference corpus; MIR constructs and audio index, incl. the pooled vs equal-weight-per-corpus audio comparison; robustness checks; verdict table; chorus excerpts; selection and encoding of the 12 eye-tracking clips|3-2 to 3-5, 3-7, 3-8, 3-9-2; ch. 4|
|2|`02\_index\_second\_third\_models.ipynb`|Index rebuilt with CLIP ViT-B/16 and DINOv2-base; agreement of the three models and an exploratory combined index; indie corpus with both models; scoring **new** videos with all three models|4-3-5, 4-8-2|
|3|`03\_human\_coding\_validity.ipynb`|Four-coder reliability (Krippendorff's alpha); validity of the index against human template-conformity (V1) in three versions; ceiling-appropriate tests; parts and whole (K-pop vs indie, choruses by ear, indie videos with performers); expert-panel content validity (I-CVI, modified kappa, S-CVI/Ave)|3-6-3, 3-6-4; 4-3-2 to 4-3-6, 4-8-5|
|4|`04\_gaze\_analysis.ipynb`|Final gaze pipeline: exclusions, data quality, preprocessing, net gaze convergence (NSS minus person-based chance level), H1a with adequacy, sensitivity versions and leave-one-out, H1b, H1c (+ 12-point permutation), D1, AOI, heatmaps, exploratory analyses, time-shifted baseline and spatial-concentration checks|3-9-3 to 3-9-7; ch. 5|

Run **01 → 02 → 03 → 04**. Notebooks 02, 03 and 04 read files written by 01 (all under one output folder, `OUT`).
Each notebook has **one PATHS cell**; normally only `BASE` needs editing. Every code cell starts with a short header and has a
Persian/English note above it naming the thesis section it serves.

In notebook 01, steps 7–8 (extraction) take several hours on a CPU and are resumable (finished stages are cached in `OUT/per\_video`).
Steps 17–20 cut the stimulus clips; they are one-off and the stimulus selection is locked (see the note in the notebook and appendix C).
In notebook 04, the participant-saturation step and the heatmap videos are optional and slow.

## Which output feeds which table

|Output (in `OUT/tables` or `OUT/gaze`)|Notebook / step|Thesis|
|-|-|-|
|`kpop\_product\_analysis.xlsx`, `FINAL\_product\_results.xlsx` (verdicts, ranking)|01 / 9, 14|4-2, 4-4 to 4-7; Tables 4-2, 4-8, 4-18|
|`saturation\_curve.xlsx`|01 / 10|4-3-1; Table 4-3|
|`index\_robustness\_checks.xlsx`, `product\_checks.xlsx`|01 / 13, 16|4-3, 4-5, 4-8; Table 4-2; appendix C|
|`indie\_reference\_comparison.xlsx`|01 / 11|4-8; Tables 4-9, 4-10|
|`mir\_and\_typicality.xlsx`, `mir\_equal\_weight.xlsx`|01 / 12, 15|4-10, 4-11; Tables 4-11 to 4-14|
|`eyetracking\_selection.xlsx`, `eyetracking\_selection\_12.xlsx`|01 / 17, 20|4-12; Tables 4-15, 4-16|
|`second\_model\_index.xlsx`, `third\_model\_index.xlsx`, `indie\_three\_models.xlsx`, `new\_video\_scores.xlsx`|02|4-3-5, 4-8-2; Table 4-7|
|`coding\_v5\_results.xlsx`|03 / 5|4-3-2, 4-3-3; Tables 4-4, 4-5|
|`v1\_parts.xlsx`, `parts\_kpop\_indie.xlsx`|03 / 6, 7|4-3-4, 4-3-6, 4-8-5|
|`cvi\_results.xlsx`|03 / 8|3-6-3; Table 3-5b|
|`gaze/gaze\_results.xlsx`|04 / 5–18|ch. 5; Tables 5-2 to 5-10, 5-12 to 5-16|
|`gaze/participant\_saturation.xlsx`|04 / 10|5-7; Table 5-11|
|`gaze/gaze\_additional\_results.xlsx`, `gaze/checks\_results.xlsx`|04 / 19, 20|5-6, 5-8, 5-9, 5-10|

## Required input files (not distributed)

Folder layout under `BASE` (default `\~/KPOP`):

* `kpop Corpus/` – the 105 K-pop music videos (`.mp4`); optional sub-folder `1080/` with high-resolution copies for the stimuli
* `Kindie Corp/` – the 33 Korean indie music videos (optional `1080/`)
* `MV\_metadata\_105\_verified\_v2.xlsx` – corpus metadata (sheet `Metadata\_105`: file\_name, artist, song, gender, release\_year, mv\_release\_date, generation\_by\_debut\_rule)
* `mv\_checkpoints\_v1\_0/` and `\*InternVideo2\_Analysis/embeddings/` – optional checkpoints of the first extraction run (reused / used for the reproducibility check)
* `new\_videos/` – optional, new videos to score (notebook 02)
* `expert\_review/expert\_review\_1.xlsx … expert\_review\_4.xlsx` – returned expert-panel sheets (notebook 03)
* In `OUT/tables` (hand-filled sheets): `chorus\_check.xlsx` / `chorus\_shortlist.xlsx`, `indie\_chorus.xlsx`, `indie\_chorus\_check.xlsx`,
`indie\_composition\_filled.xlsx`, `coding\_v5\_coder1.xlsx … coding\_v5\_coder4.xlsx`
* In `OUT/gaze`: `kpop\_eyetracking\_all.json` (all session records) and `manual/\*.json` (sessions sent by hand)
* Private, never published: `OUT/web\_clips/clip\_key.xlsx`, `OUT/web\_clips/rate\_key.xlsx`

Blank templates may be added under `templates/` (they are the only `.xlsx` files the `.gitignore` lets through).

## Environment

Python 3.11 or newer (the exact interpreter is printed by step 1 of notebook 01 and the full environment is recorded with `pip freeze`
in `pip\_freeze\_product.txt` / `pip\_freeze\_gaze.txt`). The thesis analyses ran on CPU. Main libraries (thesis appendix C, Table C-3):

|Library|Version|Use|
|-|-|-|
|torch / torchvision|2.14.1 / 0.29.1 (CPU)|representation models|
|transformers|4.51.3|InternVideo2 (`OpenGVLab/InternVideo2\_CLIP\_S`, commit 1f9fca1) and DINOv2|
|open\_clip\_torch / timm|3.3.0 / 1.0.30|CLIP ViT-B/16|
|decord / opencv-python|0.6.0 / 5.0.0.93|frame reading|
|scenedetect|0.7.1|shot detection|
|librosa|0.11.0|audio (MIR) features|
|numpy / scipy / pandas|2.4.6 / 1.17.1 / 3.0.6|computation and tables|
|statsmodels|0.15.0|mixed models|
|krippendorff / pingouin|0.9.0 / 0.7.0|reliability and agreement|
|sentence-transformers|6.1.0|semantic convergence (RQ6)|

## How to run

```bash
python -m venv .venv \&\& source .venv/bin/activate      # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
jupyter lab
```

Open the notebooks in order, edit `BASE` in the PATHS cell, and run the cells top to bottom. The first cells of each notebook also install
their libraries with `%pip`, so a plain Jupyter installation works too. All random seeds are fixed in the code.

## Licence

MIT (see `LICENSE`). The licence covers the code only, not the music videos, which remain the property of their rights holders.

## Citation

If you use this code, please cite the thesis and the preregistration:

```
Alimardani, M. H. (2026). Standardization and gaze convergence in K-pop music videos: an online webcam eye-tracking proof-of-concept study. PhD dissertation, University of Tehran.
Code: https://github.com/MHAlimardani94/kpop-adorno-eyetracking  ·  Preregistration: https://osf.io/hr6x5
```

\---

## راهنمای فارسی

این مخزن کد تحلیل رساله‌ی دکتری درباره‌ی استانداردسازی در معنای آدورنو در موزیک‌ویدئوهای کی‌پاپ است: سنجش استانداردسازی در سطح محصول با شاخص ماشینی شباهت بصری (InternVideo2، با وارسی CLIP و DINOv2، کدگذاری انسانی و پیکره‌ی مرجع ایندی کره‌ای) و آزمون آن در سطح مخاطب با مطالعه‌ی برخط ردیابی چشم با وبکم.

* **ترتیب اجرا:** نوتبوک ۰۱ (شاخص و استخراج، پیکره‌ی ایندی، MIR، محرک‌ها) ← ۰۲ (مدل‌های دوم و سوم) ← ۰۳ (کدگذاری انسانی و پنل خبرگان) ← ۰۴ (تحلیل نگاه).
* در هر نوتبوک فقط خانه‌ی **PATHS** (معمولاً فقط `BASE`) ویرایش می‌شود. بالای هر خانه توضیح کوتاه فارسی و انگلیسی و بخش متناظر رساله آمده است.
* **داده منتشر نمی‌شود:** ویدئوها (حق نشر)، داده‌ی نگاه و اطلاعات تماس مشارکت‌کنندگان، و فایل‌های کلید (`clip\_key.xlsx`، `rate\_key.xlsx`) در مخزن نیستند.
* پیش‌ثبت: https://osf.io/hr6x5 · مجوز: MIT

