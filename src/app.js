document.addEventListener('DOMContentLoaded', () => {
    const htmlInput = document.getElementById('html-input');
    const cssInput = document.getElementById('css-input');
    const jsInput = document.getElementById('js-input');
    const codeOutput = document.getElementById('code-output');
    const errorMessage = document.getElementById('error-message');

    // Redux store setup
    const initialState = {
        htmlCode: '',
        cssCode: '',
        jsCode: '',
    };

    const codeReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'UPDATE_HTML_CODE':
                return {
                    ...state,
                    htmlCode: action.payload,
                };
            case 'UPDATE_CSS_CODE':
                return {
                    ...state,
                    cssCode: action.payload,
                };
            case 'UPDATE_JS_CODE':
                return {
                    ...state,
                    jsCode: action.payload,
                };
            default:
                return state;
        }
    };

    const store = Redux.createStore(codeReducer);

    // Redux action creators
    const updateHtmlCodeAction = (code) => ({
        type: 'UPDATE_HTML_CODE',
        payload: code,
    });

    const updateCssCodeAction = (code) => ({
        type: 'UPDATE_CSS_CODE',
        payload: code,
    });

    const updateJsCodeAction = (code) => ({
        type: 'UPDATE_JS_CODE',
        payload: code,
    });

    // Subscribe to Redux store changes
    store.subscribe(() => {
        const { htmlCode, cssCode, jsCode } = store.getState();
        htmlInput.value = htmlCode;
        cssInput.value = cssCode;
        jsInput.value = jsCode;

        // Update the iframe content here
        // Update the iframe content here
        codeOutput.srcdoc = `
<!DOCTYPE html>
<html>
<head>
    <title>Output</title>
    <style>
        ${cssCode}
    </style>
</head>
<body>
    ${htmlCode}
    <script>
        try {
            parent.document.getElementById('error-message').textContent = '';
            ${jsCode}
        } catch (error) {
            parent.document.getElementById('error-message').textContent = error;
        }
    </script>
</body>
</html>
`;

        console.log(codeOutput.srcdoc);
    });

    // Dispatch Redux action when input changes
    // Dispatch Redux action when input changes
    htmlInput.addEventListener('input', () => {
        const newCode = htmlInput.value;
        store.dispatch(updateHtmlCodeAction(newCode));
        errorMessage.textContent = ''; // Clear the error message
    });

    cssInput.addEventListener('input', () => {
        const newCode = cssInput.value;
        store.dispatch(updateCssCodeAction(newCode));
        errorMessage.textContent = ''; // Clear the error message
    });

    jsInput.addEventListener('input', () => {
        const newCode = jsInput.value;
        store.dispatch(updateJsCodeAction(newCode));
        errorMessage.textContent = ''; // Clear the error message
    });
});