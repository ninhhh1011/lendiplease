document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active class
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });

    // Optional: Update active nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === current) {
                btn.classList.add('active');
            }
        });
        
        // Back to top logic
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    // Back to top click handler
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }

    // Scroll Animations
    document.querySelectorAll('.section-header, .timeline-item, .hero-intro, .hero-content, .team-member').forEach(el => el.classList.add('fade-in'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Secure Email Protection
    document.querySelectorAll('.js-secure-mail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const user = atob(btn.getAttribute('data-user'));
            const domain = atob(btn.getAttribute('data-domain'));
            const subject = btn.getAttribute('data-subject') || '';
            
            let mailUrl = `mailto:${user}@${domain}`;
            if (subject) {
                mailUrl += `?subject=${encodeURIComponent(subject)}`;
            }
            
            window.location.href = mailUrl;
        });
    });

    // Dynamic Articles Rendering
    const articles = [
        {
            title: "Trung tâm Nghiên cứu và Ứng dụng Trí tuệ nhân tạo (AIC)",
            desc: "Nơi định hướng phát triển nghiên cứu và ứng dụng AI trong giáo dục và công nghiệp.",
            img: "https://sict.haui.edu.vn/media/81/t81750.jpg",
            link: "https://sict.haui.edu.vn/vn/html/trung-tam-nghien-cuu-va-ung-dung-tri-tue-nhan-tao"
        },
        {
            title: "Hội thảo khoa học “Trí tuệ nhân tạo và ứng dụng trong công nghiệp”",
            desc: "Kết nối tri thức – định hình tương lai công nghệ.",
            img: "https://sict.haui.edu.vn/media/83/t83302.jpg",
            link: "https://sict.haui.edu.vn/vn/tin-tuc/hoi-thao-khoa-hoc-tri-tue-nhan-tao-va-ung-dung-trong-cong-nghiep-ket-noi-tri-thuc-dinh-hinh-tuong-lai-cong-nghe/71719"
        },
        {
            title: "Seminar “AI trong Fintech – Hướng nghiên cứu liên ngành”",
            desc: "Định hình không gian học thuật kết nối trí tuệ nhân tạo và kinh tế – tài chính.",
            img: "https://sict.haui.edu.vn/media/82/t82382.jpg",
            link: "https://sict.haui.edu.vn/vn/tin-tuc/seminar-ai-trong-fintech-huong-nghien-cuu-lien-nganh-dinh-hinh-khong-gian-hoc-thuat-ket-noi-tri-tue-nhan-tao-va-kinh-te-tai-chinh/71583"
        }
    ];

    const articlesContainer = document.getElementById('articles-container');
    if (articlesContainer) {
        articlesContainer.innerHTML = articles.map(article => `
            <a href="${article.link}" target="_blank" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer; justify-content: space-between;">
                <div>
                    <h3 style="font-size: 1.15rem; margin-bottom: 0.6rem;">${article.title}</h3>
                    <p style="font-size: 0.95rem;">${article.desc}</p>
                </div>
                <span style="margin-top: 1rem; font-size: 0.9rem; color: var(--accent-blue); font-weight: 600;">Xem chi tiết →</span>
            </a>
        `).join('');
        
        document.querySelectorAll('#articles-container .card.fade-in').forEach(el => observer.observe(el));
    }

    // Dynamic Research Directions Rendering
    const researchDirections = [
        {
            title: "Khoa học dữ liệu và dữ liệu lớn",
            desc: "Mô hình học máy, học sâu, AI thế hệ mới; hệ thống dữ liệu lớn; ứng dụng AI–Data trong công nghiệp, giáo dục, dịch vụ số.",
            tags: ["Machine Learning", "Deep Learning", "Big Data", "GenAI"]
        },
        {
            title: "Toán ứng dụng và tối ưu hóa",
            desc: "Mô hình toán học, thuật toán tối ưu, kết hợp AI.",
            tags: ["Applied Math", "Optimization", "AI Integration"]
        },
        {
            title: "Điều khiển và tự động hóa",
            desc: "Hệ thống nhúng, IoT, CPS; mạng cảm biến; điện toán lưới, biên, đám mây; Robotics.",
            tags: ["IoT", "Robotics", "Cloud Computing", "Embedded Systems"]
        },
        {
            title: "Công nghệ giáo dục",
            desc: "Huấn luyện mô hình ngôn ngữ lớn (LLM) cho giáo dục, AI phù hợp văn hóa và điều kiện Việt Nam.",
            tags: ["EdTech", "LLMs", "Vietnamese AI"]
        }
    ];

    const researchContainer = document.getElementById('research-container');
    if (researchContainer) {
        researchContainer.innerHTML = researchDirections.map(dir => `
            <div class="card fade-in" style="cursor: default;">
                <h3 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--text-primary);">${dir.title}</h3>
                <p style="font-size: 1rem; margin-bottom: 1.5rem; display: block;">${dir.desc}</p>
                <div class="tags" style="margin-top: auto;">
                    ${dir.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('#research-container .card.fade-in').forEach(el => observer.observe(el));
    }

    // Dynamic Student Labs Rendering
    const studentLabs = [
        {
            title: "AIC-INNOVATION LAB",
            goal: "Tập trung vào việc phát triển sản phẩm và hỗ trợ các nhóm khởi nghiệp sinh viên.",
            tasks: [
                "Chuẩn bị đội ngũ phát triển sản phẩm.",
                "Chuẩn bị các đội khởi nghiệp với sản phẩm đủ mạnh (ít nhất 10 đội trong vòng 1 năm).",
                "Thu lượm các giải thưởng sáng tạo khởi nghiệp.",
                "Hoàn thành các vòng gọi vốn.",
                "Xây dựng sản phẩm cho các dự án của AIC."
            ],
            members: [
                { name: "Nguyễn Đông Hưng", role: "Thủ lĩnh" },
                { name: "Trần Văn Nhã", role: "Chỉ huy: mảng phát triển sản phẩm" },
                { name: "Nguyễn Mạnh Niên", role: "Chỉ huy: mảng phát triển sản phẩm" },
                { name: "Phạm Quốc Hoàn", role: "Thành viên" },
                { name: "Nguyễn Văn Ninh", role: "Thành viên" }
            ],
            img: "svlab.jpg"
        },
        {
            title: "AIC-FOUNDRY LAB",
            goal: "Tập trung vào nghiên cứu khoa học, sáng chế và phát triển học thuật.",
            tasks: [
                "Bằng sáng chế khoa học.",
                "Tham gia phát triển sản phẩm với AIC-INNOVATION LAB.",
                "Bài báo khoa học quốc tế (Q1-Q3).",
                "Bài báo tại hội thảo quốc tế (Q4).",
                "Bài báo tại hội thảo khoa học trong nước.",
                "Bài báo khoa học trên các tạp chí trong nước.",
                "Giải thưởng sinh viên nghiên cứu khoa học."
            ],
            members: [
                { name: "Đặng Long Nhật", role: "Thủ lĩnh" },
                { name: "Trần Đức Quân", role: "Chỉ huy: tổ chức, sự kiện" },
                { name: "Lê Trần Gia Bảo", role: "Chỉ huy: Mảng Drone, UAV" },
                { name: "Khương Xuân Toàn", role: "Đội trưởng" },
                { name: "Lê Việt Anh", role: "Chiến binh" },
                { name: "Nguyễn Anh Tuấn", role: "Đội trưởng" },
                { name: "Nguyễn Phan Định", role: "Thành viên" },
                { name: "Nguyễn Công Sáng", role: "Thành viên" },
                { name: "Nguyễn Tiến Dũng", role: "Đội trưởng" },
                { name: "Đào Tuấn Anh", role: "Thành viên" },
                { name: "Phạm Hữu Lâm", role: "Thành viên" },
                { name: "Nguyễn Dương Tuấn Sang", role: "Thành viên" },
                { name: "Đỗ Nhật Tân", role: "Đội trưởng" },
                { name: "Vũ Văn Quân", role: "Thành viên" }
            ],
            img: "svlab.jpg"
        }
    ];

    const labRanks = [
        { rank: "Thành viên", role: "Thành viên nhóm nghiên cứu", cond: "Mới gia nhập" },
        { rank: "Chiến binh", role: "Thành viên xuất sắc trong nhóm nghiên cứu", cond: "Ít nhất 6 tháng nghiên cứu, có họp xét" },
        { rank: "Đội trưởng", role: "Trưởng một nhóm nghiên cứu", cond: "Được chỉ định và họp xét sau 6 tháng" },
        { rank: "Chỉ huy", role: "Phụ trách chung một mảng trong lab", cond: "Được thủ lĩnh chỉ định" },
        { rank: "Thủ lĩnh", role: "Trưởng lab", cond: "Được chỉ định" }
    ];

    const studentLabsContainer = document.getElementById('student-labs-container');
    if (studentLabsContainer) {
        studentLabsContainer.innerHTML = studentLabs.map(lab => `
            <div class="card fade-in" style="display: flex; flex-direction: column; text-align: left; cursor: default;">
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary); text-align: center;">${lab.title}</h3>
                
                <h4 style="color: var(--accent-blue); margin-bottom: 0.5rem; font-size: 1.1rem;">Mục tiêu và nhiệm vụ</h4>
                <p style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-secondary);">${lab.goal}</p>
                <ul style="font-size: 0.9rem; margin-bottom: 1.5rem; color: var(--text-secondary); padding-left: 1.2rem;">
                    ${lab.tasks.map(task => `<li style="margin-bottom: 0.3rem;">${task}</li>`).join('')}
                </ul>

                <h4 style="color: var(--accent-yellow); margin-bottom: 0.5rem; font-size: 1.1rem;">Cơ cấu nhân sự</h4>
                <div style="overflow-x: auto; margin-bottom: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; color: var(--text-secondary); text-align: left;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--glass-border);">
                                <th style="padding: 0.5rem;">STT</th>
                                <th style="padding: 0.5rem;">Thành viên</th>
                                <th style="padding: 0.5rem;">Vai trò</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${lab.members.map((m, i) => `
                            <tr style="border-bottom: 1px solid var(--glass-border);">
                                <td style="padding: 0.5rem;">${i + 1}</td>
                                <td style="padding: 0.5rem; color: var(--text-primary);">${m.name}</td>
                                <td style="padding: 0.5rem;">${m.role}</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `).join('');

        const rankHTML = `
            <div class="card fade-in" style="grid-column: 1 / -1; margin-top: 1rem; cursor: default;">
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary); text-align: center;">Hệ thống cấp bậc trong Lab</h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem; color: var(--text-secondary); text-align: left;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--accent-red);">
                                <th style="padding: 0.8rem;">Cấp bậc</th>
                                <th style="padding: 0.8rem;">Vai trò</th>
                                <th style="padding: 0.8rem;">Điều kiện</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${labRanks.map(r => `
                            <tr style="border-bottom: 1px solid var(--glass-border);">
                                <td style="padding: 0.8rem; color: var(--accent-blue); font-weight: bold;">${r.rank}</td>
                                <td style="padding: 0.8rem;">${r.role}</td>
                                <td style="padding: 0.8rem;">${r.cond}</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        studentLabsContainer.innerHTML += rankHTML;
        
        document.querySelectorAll('#student-labs-container .card.fade-in').forEach(el => observer.observe(el));
    }
});
