from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from gemini_utils import analyze_skin_problem
from pdf_utils import generate_pdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
PDF_DIR = "prescriptions"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PDF_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze(
    message: str = Form(...),
    image: UploadFile = File(None)
):
    image_path = None

    if image:
        image_path = os.path.join(UPLOAD_DIR, image.filename)
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    result = analyze_skin_problem(message, image_path)

    pdf_path = os.path.join(PDF_DIR, "prescription.pdf")
    generate_pdf(result, pdf_path)

    return {
        "reply": result,
        "pdf_url": "http://localhost:8000/prescriptions/prescription.pdf"
    }

from fastapi.staticfiles import StaticFiles
app.mount("/prescriptions", StaticFiles(directory="prescriptions"), name="prescriptions")
