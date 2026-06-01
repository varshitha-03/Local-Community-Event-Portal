
        function validatePhoneNumber() {
            const phoneField = document.getElementById('userPhone');
            const errorField = document.getElementById('phoneError');
            const numericExpression = /^[0-9]{10}$/; 

            if (phoneField.value.trim() === "") {
                errorField.textContent = ""; 
            } else if (!numericExpression.test(phoneField.value)) {
                errorField.textContent = "❌ Invalid format. Please enter exactly 10 numeric digits.";
                phoneField.style.borderColor = "#d32f2f";
            } else {
                errorField.textContent = "✅ Valid Phone Format";
                errorField.style.color = "#2e7d32";
                phoneField.style.borderColor = "#2e7d32";
            }
        }

        function displayFee(selectedEvent) {
            const feeDisplayBox = document.getElementById('feeDisplay');
            let cost = "$0.00";

            if(!selectedEvent || selectedEvent === "") {
                feeDisplayBox.textContent = "Calculated Fee: $0.00";
                return;
            }
            if (selectedEvent === "festival") cost = "$15.00 Entry Pass";
            else if (selectedEvent === "charity") cost = "$5.00 Donation Pass";
            else if (selectedEvent === "concert") cost = "$45.00 Premium Ticket";
            else if (selectedEvent === "tech") cost = "Free (Sponsored Workshop)";

            feeDisplayBox.textContent = "Calculated Fee: " + cost;
        }

        function countReviewCharacters() {
            const textSource = document.getElementById('feedbackTextarea').value;
            const outputCounterTarget = document.getElementById('liveCounter');
            outputCounterTarget.textContent = textSource.length;
        }
        
    function submitFeedbackForm() {
        const feedbackText = document.getElementById('feedbackTextarea').value;
        const phoneError = document.getElementById('phoneError').textContent;

        if (feedbackText.trim() === "") {
            alert("⚠️ Please write a quick review before clicking submit.");
        } else if (phoneError.includes("❌")) {
            alert("⚠️ Please correct your phone number before submitting your feedback.");
        } else {
            alert("🎉 Success! Thank you for your feedback. The city council has received your review.");
        
            document.getElementById('feedbackTextarea').value = "";
            document.getElementById('userPhone').value = "";
            document.getElementById('liveCounter').textContent = "0";
            document.getElementById('phoneError').textContent = "";
            document.getElementById('userPhone').style.borderColor = "#ccc";
        }
    }
      const imagesList = document.querySelectorAll('.gallery-img');
        imagesList.forEach(singleImg => {
            singleImg.ondblclick = function() {
                if (this.style.transform === "scale(1.4)") {
                    this.style.transform = "scale(1)";
                } else {
                    this.style.transform = "scale(1.4)";
                    this.style.transition = "transform 0.2s ease-in-out";
                }
            };
        });

        function handleVideoReady() {
            document.getElementById('videoStatus').textContent = "🎬 Video buffered completely. Ready to watch!";
            document.getElementById('videoStatus').style.color = "#2e7d32";
        }

    
        window.onbeforeunload = function (event) {
            const nameField = document.getElementById('fullname').value;
            const feedbackField = document.getElementById('feedbackTextarea').value;

            if (nameField.trim() !== "" || feedbackField.trim() !== "") {
                const warningMsg = 'You have unsaved changes on your form. Are you sure you want to leave?';
                (event || window.event).returnValue = warningMsg; 
                return warningMsg; 
            }
        };
        // Saving User Preferences
            function saveUserPreference() {
                const eventSelect = document.getElementById('eventType');
                const selectedEvent = eventSelect.value;
    
                if (selectedEvent) {
                    sessionStorage.setItem('sessionSaved', 'true'); 
                    localStorage.setItem('preferredEvent', selectedEvent);
                    alert("💾 Your preference for " + eventSelect.options[eventSelect.selectedIndex].text + " has been saved!");
                } else {
                    alert("⚠️ Please select an event type before saving your preference.");
                }
            }
            function clearUserPreferences() {
                localStorage.removeItem('preferredEvent');
                sessionStorage.removeItem('sessionSaved'); 
                document.getElementById('eventType').value = "";
                displayFee("");
                alert("🗑️ Your saved preferences have been cleared.");
            }

            
            window.addEventListener('DOMContentLoaded', () => {
                const savedPreference = localStorage.getItem('preferredEvent');
                if (savedPreference) {
                    const eventSelect = document.getElementById('eventType');
                    if (eventSelect) {
                        eventSelect.value = savedPreference;
                        displayFee(savedPreference); 
                    }
                }
            });
                    
        // GEOLOCATION FOR EVENT MAPPING
       
        function findNearbyEvents() {
            const displayOutput = document.getElementById('locationDisplay');

            if (!navigator.geolocation) {
                displayOutput.textContent = "❌ Geolocation is not supported by your current browser environment.";
                displayOutput.style.color = "#d32f2f";
                return;
            }

            displayOutput.textContent = "🛰️ Querying positioning satellites... Please wait.";
            displayOutput.style.color = "#006064";

          
            const positionOptions = {
                enableHighAccuracy: true,
                timeout: 8000,           
                maximumAge: 0            
            };

 
            navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, positionOptions);
        }
        function handleGeoSuccess(position) {
            const displayOutput = document.getElementById('locationDisplay');
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

           
            displayOutput.innerHTML = `✅ Location Found! <br> Latitude: <span class="highlight">${userLatitude}</span> <br> Longitude: <span class="highlight">${userLongitude}</span>`;
            displayOutput.style.color = "#2e7d32";
        }
        function handleGeoError(error) {
            const displayOutput = document.getElementById('locationDisplay');
            let systemFeedbackMessage = "";

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    systemFeedbackMessage = "❌ Access Denied. Please unblock location permissions in your Chrome browser address bar.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    systemFeedbackMessage = "❌ Network Error. Satellite positioning lines are currently offline.";
                    break;
                case error.TIMEOUT:
                    systemFeedbackMessage = "❌ Request Timeout. Connection threshold hit before coordinates locked.";
                    break;
                default:
                    systemFeedbackMessage = "❌ An anomalous mapping error occurred. Please try again.";
                    break;
            }

            displayOutput.textContent = systemFeedbackMessage;
            displayOutput.style.color = "#d32f2f";
        }