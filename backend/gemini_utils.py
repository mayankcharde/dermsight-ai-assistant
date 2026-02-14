from google import genai
from config import GEMINI_API_KEY
from PIL import Image

client = genai.Client(api_key=GEMINI_API_KEY)

def analyze_skin_problem(text_prompt, image_path=None):

    prompt = f"""
    You are DermSight AI – professional dermatologist assistant.

    Provide:
    1. Possible condition
    2. Causes
    3. OTC medicines
    4. Skincare routine
    5. When to consult doctor
    6. Disclaimer

    Patient description:
    {text_prompt}
    """

    if image_path:
        img = Image.open(image_path)

        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=[prompt, img]
        )
    else:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt
        )

    return response.text
