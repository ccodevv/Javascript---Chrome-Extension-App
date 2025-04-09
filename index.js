let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const emptyState = document.getElementById("empty-state")

// Load leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Update empty state visibility
function updateEmptyState() {
    if (myLeads.length === 0) {
        emptyState.style.display = "flex"
    } else {
        emptyState.style.display = "none"
    }
}

// Call this initially
updateEmptyState()

// Save current tab
tabBtn.addEventListener("click", function(){
    // Show loading state
    tabBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...'
    tabBtn.disabled = true
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // Get the URL and page title
        const tabUrl = tabs[0].url
        const tabTitle = tabs[0].title || tabUrl
        
        // Create a lead object with URL and title
        const newLead = {
            url: tabUrl,
            title: tabTitle,
            date: new Date().toISOString()
        }
        
        myLeads.push(newLead)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        
        // Reset button state
        setTimeout(() => {
            tabBtn.innerHTML = '<i class="fas fa-bookmark"></i> Save Tab'
            tabBtn.disabled = false
            showToast("Tab saved successfully!")
        }, 500)
        
        render(myLeads)
    })
})

// Render the leads list
function render(leads) {
    let listItems = ""
    
    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i]
        const leadUrl = typeof lead === 'object' ? lead.url : lead
        const leadTitle = typeof lead === 'object' ? lead.title : leadUrl
        
        listItems += `
            <li>
                <a target='_blank' href='${leadUrl}' title="${leadUrl}">
                    ${truncateText(leadTitle, 40)}
                </a>
            </li>
        `
    }
    
    ulEl.innerHTML = listItems
    updateEmptyState()
}

// Truncate text helper
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Delete all leads
deleteBtn.addEventListener("dblclick", function() {
    showConfirmDialog("Are you sure you want to delete all leads?", function() {
        localStorage.clear()
        myLeads = []
        render(myLeads)
        showToast("All leads deleted!")
    })
})

// Save input
inputBtn.addEventListener("click", function() {
    const value = inputEl.value.trim()
    
    if (!value) {
        showToast("Please enter a valid URL or note", "error")
        return
    }
    
    // Prepare the new lead object
    const newLead = {
        url: value.startsWith('http') ? value : `https://${value}`,
        title: value,
        date: new Date().toISOString()
    }
    
    // Add to leads array
    myLeads.push(newLead)
    inputEl.value = ""
    
    // Save to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    showToast("Lead saved successfully!")
})

// Handle enter key in input
inputEl.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        inputBtn.click()
    }
})

// Toast notification
function showToast(message, type = "success") {
    // Remove any existing toast
    const existingToast = document.querySelector(".toast")
    if (existingToast) {
        existingToast.remove()
    }
    
    // Create new toast
    const toast = document.createElement("div")
    toast.className = `toast ${type}`
    
    const icon = type === "success" ? "check-circle" : "exclamation-circle"
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `
    
    document.body.appendChild(toast)
    
    // Show the toast
    setTimeout(() => {
        toast.classList.add("show")
    }, 10)
    
    // Remove the toast after delay
    setTimeout(() => {
        toast.classList.remove("show")
        setTimeout(() => {
            toast.remove()
        }, 300)
    }, 3000)
}

// Confirmation dialog
function showConfirmDialog(message, confirmCallback) {
    // Create overlay
    const overlay = document.createElement("div")
    overlay.className = "overlay"
    
    // Create dialog
    const dialog = document.createElement("div")
    dialog.className = "confirm-dialog"
    dialog.innerHTML = `
        <p>${message}</p>
        <div class="dialog-buttons">
            <button class="btn secondary" id="cancel-btn">Cancel</button>
            <button class="btn danger" id="confirm-btn">Confirm</button>
        </div>
    `
    
    overlay.appendChild(dialog)
    document.body.appendChild(overlay)
    
    // Handle button clicks
    document.getElementById("cancel-btn").addEventListener("click", function() {
        overlay.remove()
    })
    
    document.getElementById("confirm-btn").addEventListener("click", function() {
        confirmCallback()
        overlay.remove()
    })
}

// Create CSS for toast and dialog
const dynamicStyles = document.createElement("style")
dynamicStyles.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.3s ease-out;
        z-index: 1000;
    }
    
    .toast.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .toast.success i {
        color: #38a169;
    }
    
    .toast.error i {
        color: #e53e3e;
    }
    
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
    }
    
    .confirm-dialog {
        background-color: white;
        padding: 20px;
        border-radius: 12px;
        width: 80%;
        max-width: 320px;
    }
    
    .confirm-dialog p {
        margin-bottom: 20px;
        text-align: center;
    }
    
    .dialog-buttons {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }
    
    .dialog-buttons button {
        flex: 1;
    }
`

document.head.appendChild(dynamicStyles)