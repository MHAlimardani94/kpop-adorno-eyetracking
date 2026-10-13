# K-pop, Adorno and gaze: code for a PhD study


**Preregistration:** OSF Registries, registered 13 October 2026, https://osf.io/hr6x5 (key linking clips to levels under embargo until data collection ends).

Code for the doctoral dissertation *Standardization in K-pop music videos and the organization of viewing* (cultural sociology, cognitive and computational approaches). Author: M. H. Alimardani.

The study tests one link in Adorno's critique of the culture industry: whether the standardization of a product's form organizes how audiences look at it.

| Folder | Contents |
|---|---|
| `notebooks/KPOP_Product_Analysis_v2_1_documented.ipynb` | Product side: InternVideo2-CLIP-S representations of 105 K-pop and 33 Korean indie music videos, the gender-balanced standardization index, automatic content features, MIR, reviewer checks, and the construction of the eye-tracking stimuli. |
| `notebooks/KPOP_Gaze_Analysis_v1_2_documented.ipynb` | Gaze side: exclusions, data quality, convergence surplus (NSS minus a person-based shuffled baseline), H1a, H1b, H1c, AOI, heatmaps and exploratory analyses, exactly as preregistered. |
| `site/index.html` | The online webcam eye-tracking study (RealEye WebcamEyeTracker Light Open 1.1.0). |
| `site/save_worker.js` | Cloudflare Worker that stores the anonymous records. |
| `site/rate.html` | Blind rating page used to check the chorus excerpts. |

## Privacy
The webcam image is processed only inside the participant's browser. **No image or video of the participant is recorded, stored or sent.** Only numeric gaze coordinates over time and the participant's answers, without names, are sent to the server for statistical analysis. You can verify this in `site/index.html`: the only requests that send data post the numeric record built in the variable `D` to `/save`; the other requests only download the page, the clips, the tracking library and the presentation order (`/row`).

## Not included
Participant data, the music video files and clips (copyright), and the key files linking clip names to standardization levels.

## License
MIT (see `LICENSE`).

---

# کد پژوهش دکتری: کی‌پاپ، آدورنو و نگاه

این مخزن کد رساله‌ی دکتری جامعه‌شناسی فرهنگی در حوزه‌ی علوم شناختی و محاسباتی است: آیا استانداردسازی فرم محصول فرهنگی نگاه مخاطبان را سازمان می‌دهد؟

**حریم خصوصی:** تصویر دوربین فقط در مرورگر شرکت‌کننده پردازش می‌شود و **هیچ تصویری ثبت، ذخیره یا ارسال نمی‌شود**. تنها مختصات عددی نگاه در طول زمان و پاسخ‌ها، بدون نام، برای تحلیل آماری فرستاده می‌شود. این را می‌توان در `site/index.html` وارسی کرد.

داده‌ی شرکت‌کنندگان، فایل‌های ویدئو و کلیدهای سطح قطعه‌ها در این مخزن نیستند.
