// Main application script
import { config } from './config.js';
import { YouTubeChatMonitor } from './chat-monitor.js';
import { ChatUtils } from './utils.js';
import { ChatUtilities } from './chat-utilities.js';
import { DownloadHandler } from './download-handler.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set file information from config
    document.getElementById('file-name').textContent = config.FILE_NAME;
    document.getElementById('file-size').textContent = config.FILE_SIZE;
    
    // Initialize download handler
    const downloadHandler = new DownloadHandler();
    window.downloadHandler = downloadHandler; // Make it available globally
    
    // Adjust page content to avoid scrolling
    adjustPageLayout();
    
    // Initial download button click handler
    document.getElementById('main-download-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('initial-download-container').style.display = 'none';
        document.getElementById('verification-container').style.display = 'block';
        
        // Initialize the monitor
        const chatMonitor = new YouTubeChatMonitor();
        
        // When a user has been verified, the chat monitor will call:
        // window.downloadHandler.showVerificationSuccess(username, keyword);
    });
    
    // Copy keyword button
    document.getElementById('copy-keyword').addEventListener('click', function() {
        const keyword = document.getElementById('keyword-display').textContent;
        navigator.clipboard.writeText(keyword).then(() => {
            // Show copied notification
            const oldText = this.innerHTML;
            
            ChatUtils.updateBilingualElement(this, 
                '<i class="fas fa-check"></i> Copied!', 
                '<i class="fas fa-check"></i> تم النسخ!');
                
            setTimeout(() => {
                this.innerHTML = oldText;
            }, 2000);
        });
    });
    
    // Function to adjust page layout
    function adjustPageLayout() {
        // Reduce padding and margins to make content fit without scrolling
        const container = document.querySelector('.container');
        if (window.innerHeight < 800) {
            container.style.padding = '10px';
            container.style.marginTop = '10px';
            container.style.marginBottom = '10px';
        }
        
        // Limit chat container height
        // This is no longer necessary as chat container is hidden, but keeping the function for other potential layout adjustments.
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.maxHeight = '200px';
        }
    }
});