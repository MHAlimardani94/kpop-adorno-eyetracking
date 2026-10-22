# K-pop, Adorno's standardization and webcam eye tracking: analysis notebooks

Analysis code for a PhD thesis that tests one link of Adorno's critique of the culture industry: that the **standardization** of a product's form
organizes in advance how audiences look at it. Standardization is measured at the **product level** with a machine-learning index of visual
similarity among 105 official K-pop music videos (InternVideo2, checked with CLIP and DINOv2, validated against human coding and compared with a
Korean indie reference corpus). It is then tested at the **audience level** with an online webcam eye-tracking study (net gaze convergence, H1a–H1c).

- Preregistration (OSF): https://osf.io/hr6x5
- Repository: https://github.com/MHAlimardani94/kpop-adorno-eyetracking

> **No data, videos or keys are included.** The music videos are copyrighted; participant gaze records and contact data are private;
> the key files that link blind clip names to standardization levels (`clip_key.xlsx`, `rate_key.xlsx`) are never published.
> The notebooks are released with all outputs cleared.

## Notebooks and run order

| # | Notebook | What it does | Thesis |
|---|---|---|---|
| 1 | `01_product_index_InternVideo2.ipynb` | Corpus and per-video extraction (InternVideo2-CLIP-S windows, OpenCV features, PySceneDetect shots, YuNet faces, librosa audio); gender-balanced standardization index and sensitivity versions; saturation of the ranking; Korean indie reference corpus; MIR constructs and audio index, incl. the pooled vs equal-weight-per-corpus audio comparison; robustness checks; verdict table; chorus excerpts; selection and encoding of the 12 eye-tracking clips | 3-2 to 3-5, 3-7, 3-8, 3-9-2; ch. 4 |
| 2 | `02_index_second_third_models.ipynb` | Index rebuilt with CLIP ViT-B/16 and DINOv2-base; agreement of the three models and an exploratory combined index; indie corpus with both models; scoring **new** videos with all three models | 4-3-5, 4-8-2 |
| 3 | `03_human_coding_validity.ipynb` | Four-coder reliability (Krippendorff's alpha); validity of the index against human template-conformity (V1) in three versions; ceiling-appropriate tests; parts and whole (K-pop vs indie, choruses by ear, indie videos with performers); expert-panel content validity (I-CVI, modified kappa, S-CVI/Ave) | 3-6-3, 3-6-4; 4-3-2 to 4-3-6, 4-8-5 |
| 4 | `04_gaze_analysis.ipynb` | Final gaze pipeline: exclusions, data quality, preprocessing, net gaze convergence (NSS minus person-based chance level), H1a with adequacy, sensitivity versions and leave-one-out, H1b, H1c (+ 12-point permutation), D1, AOI, heatmaps, exploratory analyses, time-shifted baseline and spatial-concentration checks | 3-9-3 to 3-9-7; ch. 5 |

Run **01 → 02 → 03 → 04**. Notebooks 02, 03 and 04 read files written by 01 (all under one output folder, `OUT`).
Each notebook has **one PATHS cell**; normally only `BASE` needs editing. Every code cell starts with a short header and has a
Persian/English note above it naming the thesis section it serves.

In notebook 01, steps 7–8 (extraction) take several hours on a CPU and are resumable (finished stages are cached in `OUT/per_video`).
Steps 17–20 cut the stimulus clips; they are one-off and the stimulus selection is locked (see the note in the notebook and appendix C).
In notebook 04, the participant-saturation step and the heatmap videos are optional and slow.

## Which output feeds which table

| Output (in `OUT/tables` or `OUT/gaze`) | Notebook / step | Thesis |
|---|---|---|
| `kpop_product_analysis.xlsx`, `FINAL_product_results.xlsx` (verdicts, ranking) | 01 / 9, 14 | 4-2, 4-4 to 4-7; Tables 4-2, 4-8, 4-18 |
| `saturation_curve.xlsx` | 01 / 10 | 4-3-1; Table 4-3 |
| `index_robustness_checks.xlsx`, `product_checks.xlsx` | 01 / 13, 16 | 4-3, 4-5, 4-8; Table 4-2; appendix C |
| `indie_reference_comparison.xlsx` | 01 / 11 | 4-8; Tables 4-9, 4-10 |
| `mir_and_typicality.xlsx`, `mir_equal_weight.xlsx` | 01 / 12, 15 | 4-10, 4-11; Tables 4-11 to 4-14 |
| `eyetracking_selection.xlsx`, `eyetracking_selection_12.xlsx` | 01 / 17, 20 | 4-12; Tables 4-15, 4-16 |
| `second_model_index.xlsx`, `third_model_index.xlsx`, `indie_three_models.xlsx`, `new_video_scores.xlsx` | 02 | 4-3-5, 4-8-2; Table 4-7 |
| `coding_v5_results.xlsx` | 03 / 5 | 4-3-2, 4-3-3; Tables 4-4, 4-5 |
| `v1_parts.xlsx`, `parts_kpop_indie.xlsx` | 03 / 6, 7 | 4-3-4, 4-3-6, 4-8-5 |
| `cvi_results.xlsx` | 03 / 8 | 3-6-3; Table 3-5b |
| `gaze/gaze_results.xlsx` | 04 / 5–18 | ch. 5; Tables 5-2 to 5-10, 5-12 to 5-16 |
| `gaze/participant_saturation.xlsx` | 04 / 10 | 5-7; Table 5-11 |
| `gaze/gaze_additional_results.xlsx`, `gaze/checks_results.xlsx` | 04 / 19, 20 | 5-6, 5-8, 5-9, 5-10 |

## Required input files (not distributed)

Folder layout under `BASE` (default `~/KPOP`):

- `kpop Corpus/` – the 105 K-pop music videos (`.mp4`); optional sub-folder `1080/` with high-resolution copies for the stimuli
- `Kindie Corp/` – the 33 Korean indie music videos (optional `1080/`)
- `MV_metadata_105_verified_v2.xlsx` – corpus metadata (sheet `Metadata_105`: file_name, artist, song, gender, release_year, mv_release_date, generation_by_debut_rule)
- `mv_checkpoints_v1_0/` and `*InternVideo2_Analysis/embeddings/` – optional checkpoints of the first extraction run (reused / used for the reproducibility check)
- `new_videos/` – optional, new videos to score (notebook 02)
- `expert_review/expert_review_1.xlsx … expert_review_4.xlsx` – returned expert-panel sheets (notebook 03)
- In `OUT/tables` (hand-filled sheets): `chorus_check.xlsx` / `chorus_shortlist.xlsx`, `indie_chorus.xlsx`, `indie_chorus_check.xlsx`,
  `indie_composition_filled.xlsx`, `coding_v5_coder1.xlsx … coding_v5_coder4.xlsx`
- In `OUT/gaze`: `kpop_eyetracking_all.json` (all session records) and `manual/*.json` (sessions sent by hand)
- Private, never published: `OUT/web_clips/clip_key.xlsx`, `OUT/web_clips/rate_key.xlsx`

Blank templates may be added under `templates/` (they are the only `.xlsx` files the `.gitignore` lets through).

## Environment

Python 3.11 or newer (the exact interpreter is printed by step 1 of notebook 01 and the full environment is recorded with `pip freeze`
in `pip_freeze_product.txt` / `pip_freeze_gaze.txt`). The thesis analyses ran on CPU. Main libraries (thesis appendix C, Table C-3):

| Library | Version | Use |
|---|---|---|
| torch / torchvision | 2.14.1 / 0.29.1 (CPU) | representation models |
| transformers | 4.51.3 | InternVideo2 (`OpenGVLab/InternVideo2_CLIP_S`, commit 1f9fca1) and DINOv2 |
| open_clip_torch / timm | 3.3.0 / 1.0.30 | CLIP ViT-B/16 |
| decord / opencv-python | 0.6.0 / 5.0.0.93 | frame reading |
| scenedetect | 0.7.1 | shot detection |
| librosa | 0.11.0 | audio (MIR) features |
| numpy / scipy / pandas | 2.4.6 / 1.17.1 / 3.0.6 | computation and tables |
| statsmodels | 0.15.0 | mixed models |
| krippendorff / pingouin | 0.9.0 / 0.7.0 | reliability and agreement |
| sentence-transformers | 6.1.0 | semantic convergence (RQ6) |

## How to run

```bash
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
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
Alimardani, M. H. (2026). [Thesis title]. PhD dissertation, [University].
Code: https://github.com/MHAlimardani94/kpop-adorno-eyetracking  ·  Preregistration: https://osf.io/hr6x5
```

---

## راهنمای فارسی

این مخزن کد تحلیل رساله‌ی دکتری درباره‌ی استانداردسازی در معنای آدورنو در موزیک‌ویدئوهای کی‌پاپ است: سنجش استانداردسازی در سطح محصول با شاخص ماشینی شباهت بصری (InternVideo2، با وارسی CLIP و DINOv2، کدگذاری انسانی و پیکره‌ی مرجع ایندی کره‌ای) و آزمون آن در سطح مخاطب با مطالعه‌ی برخط ردیابی چشم با وبکم.

- **ترتیب اجرا:** نوتبوک ۰۱ (شاخص و استخراج، پیکره‌ی ایندی، MIR، محرک‌ها) ← ۰۲ (مدل‌های دوم و سوم) ← ۰۳ (کدگذاری انسانی و پنل خبرگان) ← ۰۴ (تحلیل نگاه).
- در هر نوتبوک فقط خانه‌ی **PATHS** (معمولاً فقط `BASE`) ویرایش می‌شود. بالای هر خانه توضیح کوتاه فارسی و انگلیسی و بخش متناظر رساله آمده است.
- **داده منتشر نمی‌شود:** ویدئوها (حق نشر)، داده‌ی نگاه و اطلاعات تماس مشارکت‌کنندگان، و فایل‌های کلید (`clip_key.xlsx`، `rate_key.xlsx`) در مخزن نیستند.
- پیش‌ثبت: https://osf.io/hr6x5 · مجوز: MIT
