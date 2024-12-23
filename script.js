document.getElementById("testApiBtn").addEventListener("click", function() {
    const apiUrl = document.getElementById("apiUrl").value;

    // التأكد من إدخال رابط API صحيح
    if (!apiUrl) {
        alert("يرجى إدخال رابط API");
        return;
    }

    // اختبار الـ API
    testApi(apiUrl);
});

function testApi(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // إذا كان الاتصال ناجحًا
            displayApiResult(data, "نجح الاتصال بالـ API واسترجاع البيانات.");
        })
        .catch(error => {
            // في حال حدوث خطأ في الاتصال
            displayApiResult(null, `فشل الاتصال بالـ API: ${error.message}`);
        });
}

function displayApiResult(data, message) {
    const resultSection = document.getElementById("apiResult");
    const responseDetails = document.getElementById("responseDetails");

    // عرض رسالة الاختبار
    responseDetails.innerHTML = `
        <p><strong>رسالة:</strong> ${message}</p>
        <pre><strong>الاستجابة:</strong> ${JSON.stringify(data, null, 2)}</pre>
    `;

    // إظهار قسم النتائج
    resultSection.style.display = "block";

    // إضافة وظيفة تحميل التقرير
    document.getElementById("downloadReportBtn").addEventListener("click", function() {
        generateReport(data, message);
    });
}

function generateReport(data, message) {
    const report = `
        تقرير اختبار API:
        =====================

        الرابط: ${document.getElementById("apiUrl").value}
        الرسالة: ${message}

        الاستجابة:
        ${JSON.stringify(data, null, 2)}
    `;

    // تحميل التقرير بتنسيق نصي
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "api_test_report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
