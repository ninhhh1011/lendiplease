document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('chat-send-btn');
    const typingIndicator = document.getElementById('typing-indicator');

    const rules = [
        {
            keywords: ["aic", "trung tâm aic", "aic là gì", "thuộc trường nào"],
            answer: "AIC là Trung tâm Nghiên cứu và Ứng dụng Trí tuệ nhân tạo, trực thuộc SICT - Đại học Công nghiệp Hà Nội."
        },
        {
            keywords: ["chức năng", "nhiệm vụ", "làm gì"],
            answer: "AIC thực hiện nghiên cứu khoa học, chuyển giao công nghệ, hợp tác doanh nghiệp và đào tạo nhân lực AI."
        },
        {
            keywords: ["mục tiêu", "tầm nhìn", "định hướng"],
            answer: "AIC hướng tới trở thành trung tâm nghiên cứu mạnh về AI, phục vụ chuyển đổi số và phát triển công nghệ tại Việt Nam."
        },
        {
            keywords: ["giám đốc", "lãnh đạo", "cơ cấu"],
            answer: "Ban lãnh đạo gồm GS.TSKH Lê Thị Hoài An, TS. Đặng Trọng Hợp và TS. Nguyễn Mạnh Cường."
        },
        {
            keywords: ["nghiên cứu", "lĩnh vực", "ai làm gì"],
            answer: "AIC tập trung vào Data Science, tối ưu hóa, IoT/Robotics và công nghệ giáo dục."
        },
        {
            keywords: ["hội thảo", "seminar", "sự kiện"],
            answer: "AIC thường xuyên tổ chức seminar AI trong Fintech và hội thảo AI trong công nghiệp."
        },
        {
            keywords: ["tuyển", "tham gia", "đăng ký", "join"],
            answer: "Bạn có thể tham gia AIC bằng cách gửi email đăng ký qua mục Tuyển dụng trên website."
        },
        {
            keywords: ["địa chỉ", "liên hệ", "ở đâu"],
            answer: "Văn phòng: Phòng 1201 A1, Lab: Phòng 1504 A1 - Đại học Công nghiệp Hà Nội."
        }
    ];

    const fallbackResponse = "Xin lỗi, mình chưa hiểu câu hỏi. Bạn có thể hỏi về AIC, tuyển thành viên, nghiên cứu hoặc liên hệ nhé!";

    function removeVietnameseTones(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    function getBotResponse(input) {
        const lowerInput = removeVietnameseTones(input.toLowerCase());
        for (const rule of rules) {
            for (let keyword of rule.keywords) {
                keyword = removeVietnameseTones(keyword.toLowerCase());
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
