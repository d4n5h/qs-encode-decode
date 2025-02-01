// Add input event listeners for real-time processing
document.getElementById("encode-input").addEventListener("input", processEncode);
document.getElementById("decode-input").addEventListener("input", processDecode);

function processEncode() {
    const input = document.getElementById("encode-input").value;
    const error = document.getElementById("encode-error");
    const urlToggle = document.getElementById("url-encode-toggle").checked;

    if (!input) {
        document.getElementById("encode-output").value = "";
        error.style.display = "none";
        return;
    }

    try {
        // Always do QS encoding first
        const parsed = JSON.parse(input);
        let result = Qs.stringify(parsed);

        // Then URL encode if toggle is on
        if (urlToggle) {
            result = encodeURIComponent(result);
        }

        document.getElementById("encode-output").value = result;
        error.style.display = "none";
    } catch (e) {
        error.style.display = "block";
        error.textContent = "Please enter valid JSON";
    }
}

function processDecode() {
    const input = document.getElementById("decode-input").value;
    const error = document.getElementById("decode-error");
    const urlToggle = document.getElementById("url-decode-toggle").checked;

    if (!input) {
        document.getElementById("decode-output").value = "";
        error.style.display = "none";
        return;
    }

    try {
        let result = input;

        // URL decode first if toggle is on
        if (urlToggle) {
            result = decodeURIComponent(result);
        }

        // Always do QS decoding
        const decoded = Qs.parse(result);
        document.getElementById("decode-output").value = JSON.stringify(decoded, null, 2);
        error.style.display = "none";
    } catch (e) {
        error.style.display = "block";
        error.textContent = "Invalid input format";
    }
}

function clearAll() {
    ["encode-input", "encode-output", "decode-input", "decode-output"].forEach((id) => {
        document.getElementById(id).value = "";
    });
    ["url-encode-toggle", "url-decode-toggle"].forEach((id) => {
        document.getElementById(id).checked = false;
    });
    ["encode-error", "decode-error"].forEach((id) => {
        document.getElementById(id).style.display = "none";
    });
} 