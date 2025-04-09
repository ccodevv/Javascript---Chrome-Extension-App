# Javascript---Chrome-Extension-App
This JavaScript code powers a Chrome extension called "Leads Tracker" that helps users save and manage URLs (leads) while browsing the web. The extension allows users to manually input URLs, save the current tab's URL, and manage their collection of saved leads.

# Leads Tracker Chrome Extension
Description
Leads Tracker is a simple Chrome extension that helps you save and manage important links (leads) while browsing. Whether you're a sales professional tracking potential clients, a recruiter saving job applications, or just someone who wants to organize URLs for later reference, this extension provides an easy way to:

- Manually input and save URLs
- Save the current tab's URL with one click
- View all saved leads with clickable links
- Clear all stored leads when needed

All leads are stored in your browser's local storage, so they persist even after closing Chrome.
# Features

- Save Manual Input: Enter any URL or text and save it to your leads list
- Save Current Tab: Capture the URL of your active tab with one click
- Persistent Storage: All leads are saved to Chrome's local storage
- Easy Deletion: Double-click the delete button to clear all saved leads
- Clickable Links: All saved leads are rendered as clickable links that open in a new tab

# Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the directory containing this extension
5. The Leads Tracker extension should now appear in your extensions list

# Usage

1. Click the Leads Tracker icon in your Chrome toolbar to open the extension
2. To save a URL manually:
- Type or paste the URL into the input field
- Click "SAVE INPUT" button

3. To save the current tab:
- Navigate to the webpage you want to save
- Open the extension and click "SAVE TAB" button


4. To view your saved leads:
- Open the extension to see all saved URLs as clickable links

5. To delete all saved leads:
- Double-click the "DELETE ALL" button



# Technical Details
The extension uses:

- Chrome Extensions API for tab management
- localStorage for persistent data storage
- JSON.parse and JSON.stringify for data handling
- Event listeners for button interactions
- Template literals for dynamic HTML creation

# Files

- manifest.json: Extension configuration
- index.html: Extension popup structure
- index.css: Styling for the extension popup
- index.js: Main JavaScript functionality
