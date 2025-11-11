# n8n Lead Submission Workflow Setup Guide

## Overview
This guide will help you import and configure the lead submission workflow in n8n.

## Workflow Architecture

The workflow consists of 5 nodes:

1. **Webhook Node** - Receives POST requests from the frontend
2. **Code Node** - Cleans and normalizes the incoming data
3. **Directus Node** - Creates a new lead record in Directus
4. **Respond Node** - Sends success response back to frontend
5. **Notification Node** (Optional, Disabled) - Sends alerts to Slack/Email

## Setup Instructions

### Step 1: Access n8n
1. Go to: https://automation.leads2scale.com
2. Log in with your n8n credentials

### Step 2: Import the Workflow
1. Click on "Workflows" in the left sidebar
2. Click the "+ Add Workflow" button (or use the dropdown)
3. Click the "..." menu (top right)
4. Select "Import from File"
5. Upload the file: `/opt/southsuburbs/n8n-lead-submission-workflow.json`
6. Click "Import"

### Step 3: Verify Webhook Path
1. Click on the "Webhook - Lead Submission" node
2. Confirm the webhook path is: `lead-submission`
3. The full webhook URL will be: `https://automation.leads2scale.com/webhook/lead-submission`

### Step 4: Test the Webhook Node
1. Click on the "Webhook - Lead Submission" node
2. Click "Listen for Test Event"
3. In a new terminal, run this test command:

```bash
curl -X POST https://automation.leads2scale.com/webhook/lead-submission \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "test-uuid-here",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "7085551234",
    "city_or_zip": "60462",
    "service_requested": "HVAC Repair",
    "message": "My AC is not working",
    "preferred_contact": "email",
    "budget_range": "1k_5k",
    "timeline": "urgent",
    "source": "website",
    "ip_address": "1.2.3.4"
  }'
```

4. You should see the webhook receive the data in n8n

### Step 5: Verify Code Node
1. After the webhook receives test data, click "Execute Node" on the "Clean & Normalize Data" node
2. Check the output to ensure data is properly cleaned
3. All snake_case fields should be present

### Step 6: Configure Directus Node (if needed)
The Directus token is already configured in the workflow, but you can verify:

1. Click on "Create Lead in Directus" node
2. Check the Authorization header: `Bearer EDMZWZPeaYCnXOgYze4kpqR_Sp1TVpHl`
3. Verify the URL: `https://admin.southsuburbsbest.com/items/leads`

### Step 7: Activate the Workflow
1. Click the toggle switch in the top right corner to **Activate** the workflow
2. The workflow is now live and ready to receive leads from the frontend

### Step 8: (Optional) Enable Notifications
If you want to receive notifications when leads come in:

1. Click on the "Send Notification (Optional)" node
2. Replace `YOUR_SLACK_WEBHOOK_HERE` with your actual Slack webhook URL
   - Or modify it to send email notifications instead
3. Click the "Disabled" toggle to **Enable** the node
4. Save the workflow

## Testing the Complete Flow

### End-to-End Test
1. Go to: https://southsuburbsbest.com/quote
2. Fill out the form with test data
3. Submit the form
4. Check n8n executions to see if it ran successfully
5. Check Directus admin panel: https://admin.southsuburbsbest.com/admin/content/leads
6. Verify the new lead appears in the `leads` collection

### Test with a Specific Business
1. Go to: https://southsuburbsbest.com/business/[some-business-slug]
2. Click "Request a Quote"
3. Fill out and submit the form
4. Verify the `business_id` field is populated correctly in Directus

## Troubleshooting

### Webhook Returns 404
- Ensure the workflow is **activated** (toggle in top right)
- Check the webhook path is exactly: `lead-submission`
- Verify n8n is running: `docker ps | grep n8n`

### Directus Returns 401 (Unauthorized)
- Check the Directus API token in the "Create Lead in Directus" node
- Verify the token is still valid in Directus admin panel
- Generate a new token if needed: Settings → Access Tokens

### Directus Returns 400 (Bad Request)
- Check the leads table schema in Directus
- Ensure all required fields (customer_name, customer_email, message) are being sent
- Review the Code node output to verify data structure

### Frontend Can't Reach Webhook
- Check the env var: `NEXT_PUBLIC_N8N_WEBHOOK_URL`
- Verify Caddy is routing automation.leads2scale.com correctly
- Check CORS settings if getting browser errors

## Workflow Data Flow

```
Frontend Form
    ↓
    POST /webhook/lead-submission
    ↓
Webhook Node (receives JSON)
    ↓
Code Node (clean & validate)
    ↓
Directus HTTP Request (create lead)
    ↓
    ├─→ Respond to Webhook (200 OK)
    └─→ Send Notification (optional)
```

## Expected Payload Schema

The webhook expects this JSON structure (all snake_case):

```json
{
  "business_id": "uuid",
  "customer_name": "string (required)",
  "customer_email": "string (required)",
  "customer_phone": "string (optional)",
  "city_or_zip": "string (optional)",
  "service_requested": "string (optional)",
  "message": "string (required)",
  "preferred_contact": "email|phone|either",
  "budget_range": "under_1k|1k_5k|5k_10k|10k_25k|25k_plus|null",
  "timeline": "urgent|1_week|1_month|3_months|flexible|null",
  "source": "website|mobile|api",
  "utm_source": "string (optional)",
  "utm_medium": "string (optional)",
  "utm_campaign": "string (optional)",
  "ip_address": "string (optional)"
}
```

## Monitoring

### View Execution History
1. Go to "Executions" in n8n left sidebar
2. See all past webhook calls and their status
3. Click on any execution to see detailed logs

### Common Error Messages
- **"Missing required fields"** - Frontend didn't send customer_name, email, or message
- **"Invalid email format"** - Email validation failed in Code node
- **"Directus error 403"** - Permission issue with API token
- **"Network error"** - n8n can't reach Directus (check Docker network)

## Next Steps

After confirming the workflow works:

1. **Monitor leads** in Directus regularly
2. **Set up email notifications** for new leads
3. **Create follow-up workflows** (e.g., auto-send confirmation email to customer)
4. **Add lead scoring** logic based on budget_range and timeline
5. **Integrate with CRM** if you expand beyond Directus

## Support

If you encounter issues:
- Check n8n logs: `docker logs n8n --tail=100`
- Check Directus logs: `cd /opt/southsuburbs && docker compose logs directus --tail=100`
- Review frontend logs in browser console (F12)
