document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('chat-send-btn');
    const typingIndicator = document.getElementById('typing-indicator');

    const rules = [
        {
            keywords: ["aic là gì", "trung tâm aic", "aic viết tắt", "thuộc trường nào"],
            answer: "AIC là viết tắt của Trung tâm Nghiên cứu và Ứng dụng Trí tuệ nhân tạo. Đây là đơn vị trực thuộc Trường Công nghệ Thông tin và Truyền thông (SICT), Đại học Công nghiệp Hà Nội (HaUI)."
        },
        {
            keywords: ["chức năng", "nhiệm vụ", "trung tâm làm gì"],
            answer: "Trung tâm AIC hoạt động theo mô hình mở, tổ chức nghiên cứu khoa học, chuyển giao công nghệ, hợp tác với doanh nghiệp và viện nghiên cứu. Đồng thời triển khai các đề tài nghiên cứu và đào tạo nguồn nhân lực AI chất lượng cao."
        },
        {
            keywords: ["mục tiêu", "tầm nhìn", "định hướng"],
            answer: "AIC hướng tới trở thành đơn vị nghiên cứu mạnh về AI tại Việt Nam, phục vụ chuyển đổi số trong giáo dục và công nghiệp, đồng thời phát triển công nghệ lõi và nghiên cứu liên ngành với kinh tế, tài chính."
        },
        {
            keywords: ["giám đốc", "lãnh đạo", "cơ cấu", "tổ chức"],
            answer: "Ban lãnh đạo Trung tâm AIC gồm: GS.TSKH. Lê Thị Hoài An (Giám đốc khoa học), TS. Đặng Trọng Hợp (Giám đốc điều hành), TS. Nguyễn Mạnh Cường (Phó Giám đốc)."
        },
        {
            keywords: ["nghiên cứu", "lĩnh vực", "hướng nghiên cứu"],
            answer: "AIC tập trung vào 4 hướng chính: Khoa học dữ liệu & Big Data, Toán ứng dụng & tối ưu hóa, Điều khiển & tự động hóa (IoT, Robotics), và Công nghệ giáo dục (LLM trong giáo dục)."
        },
        {
            keywords: ["sự kiện", "seminar", "hội thảo"],
            answer: "AIC tổ chức nhiều sự kiện như Seminar 'AI trong Fintech' (31/12/2025) và tham gia hội thảo 'AI trong công nghiệp' (24/04/2026)."
        },
        {
            keywords: ["địa chỉ", "liên hệ", "ở đâu"],
            answer: "Trung tâm AIC đặt tại Cơ sở 1 - Đại học Công nghiệp Hà Nội. Văn phòng: Phòng 1201, Tòa A1. Phòng thí nghiệm: Phòng 1504, Tòa A1."
        },
        {
            keywords: ["lộ trình", "phát triển", "học được gì", "training", "đào tạo", "giai đoạn"],
            answer: `Lộ trình phát triển tại AIC:

🟢 Giai đoạn 1: Nền tảng
- Làm quen với Python
- Học Machine Learning cơ bản
- Tham gia các buổi training nội bộ

🟡 Giai đoạn 2: Tham gia Lab
- Chọn hướng nghiên cứu (AI Core / Application)
- Làm việc theo nhóm
- Được mentor hướng dẫn

🔵 Giai đoạn 3: Thực hiện dự án
- Xây dựng sản phẩm AI
- Tham gia các cuộc thi
- Đóng góp vào hệ thống thực tế

🔴 Giai đoạn 4: Nghiên cứu & Khởi nghiệp
- Công bố bài báo khoa học
- Phát triển sản phẩm AI
- Tham gia startup công nghệ`
        }
    ];

    const fallbackResponse = "Xin lỗi, mình chưa hiểu câu hỏi. Bạn có thể hỏi về AIC, nghiên cứu, tuyển thành viên hoặc seminar nhé!";

    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        for (const rule of rules) {
            for (const keyword of rule.keywords) {
                if (lowerInput.includes(keyword)) {
                    return rule.answer;
                }
            }
        }
        return fallbackResponse;
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend(predefinedText = null) {
        const text = predefinedText !== null ? predefinedText : chatInput.value.trim();
        if (text === '') return;

        // Add user message
        addMessage(text, 'user');
        chatInput.value = '';

        // Show typing indicator
        if (typingIndicator) {
            chatMessages.appendChild(typingIndicator); // Move to bottom
            typingIndicator.style.display = 'block';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Simulate bot typing delay
        setTimeout(() => {
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
            const botResponse = getBotResponse(text);
            addMessage(botResponse, 'bot');
        }, 1000);
    }

    sendBtn.addEventListener('click', () => handleSend());

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Quick Replies
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
    quickReplyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleSend(btn.textContent);
        });
    });
});
