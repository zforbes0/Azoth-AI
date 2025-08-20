# Gemini JSON Prompt Execution Instructions

When you receive a JSON file with the following structure, treat it as executable instructions to create a blog post:

## How to Process JSON Prompts:

1. **Read the JSON structure** - Each field contains specific requirements and templates
2. **Execute the task_type** - Always "SUB_ARTICLE" which means create a complete .astro blog post file  
3. **Use research_data_source** - Access the specified .md file for verified data
4. **Follow critical_requirements** - These are non-negotiable rules for content structure
5. **Apply visual_templates** - Use the provided HTML/CSS templates exactly as shown
6. **Create the file** - Generate the complete .astro file in src/pages/blog/ directory

## Your Response Should Be:
- Execute the file creation immediately
- Report what you created and where
- Do NOT ask for clarification - the JSON contains everything needed

## Example Process:
1. JSON says `"task_type": "SUB_ARTICLE"` → Create a blog post
2. JSON says `"research_data_source": "ai-chatbot-research-data.md"` → Read that file for data  
3. JSON contains templates → Use them exactly as provided
4. JSON specifies file structure → Follow it precisely

**Execute immediately upon receiving JSON prompts - they are complete instructions, not data to analyze.**