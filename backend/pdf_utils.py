from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

def generate_pdf(text, filename):

    doc = SimpleDocTemplate(filename)
    elements = []

    styles = getSampleStyleSheet()
    style = styles["Normal"]

    for line in text.split("\n"):
        elements.append(Paragraph(line, style))
        elements.append(Spacer(1, 0.2 * inch))

    doc.build(elements)
