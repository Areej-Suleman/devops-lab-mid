from fastapi import FastAPI, Request
import json
from datetime import datetime

app = FastAPI()

@app.post("/webhook/test-report")
async def receive_report(request: Request):
    # Parse the incoming JSON report from GitHub Actions
    report_data = await request.json()
    
    # Save it to a local file named test-report.json
    with open("test-report.json", "w") as f:
        json.dump(report_data, f, indent=4)
        
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Report received and saved! Overall Status: {report_data.get('summary', {}).get('overall_status', 'Unknown')}")
    
    return {"message": "Report successfully saved to localhost"}