// ============================
// 行程数据：每天的重点与提醒
// 月份从0开始，11 = 12月，0 = 1月
// ============================
const tripDays = [
    {
        date: new Date(2026, 11, 26),
        tag: "DAY 1｜抵达哈尔滨",
        highlights: [
            "FM878 PEN→PVG 08:30-13:40，FM9065 PVG→HRB 16:05-19:05",
            "专车接机前往酒店",
            "入住哈尔滨松北融创皇冠假日酒店"
        ],
        reminder: "今晚早点休息，为明天冰城行程养精蓄锐",
        anchor: "#day1"
    },
    {
        date: new Date(2026, 11, 27),
        tag: "DAY 2｜冰城经典巡礼",
        highlights: [
            "09:30 出发，圣索菲亚大教堂 / 中央大街",
            "松花江冰雪景观",
            "下午哈尔滨冰雪大世界"
        ],
        reminder: "⚠️ 下午进入冰雪大世界，注意保暖及手机续航",
        anchor: "#day2"
    },
    {
        date: new Date(2026, 11, 28),
        tag: "DAY 3｜亚布力滑雪",
        highlights: [
            "08:00 出发，哈尔滨 → 亚布力（约3小时车程）",
            "滑雪体验 / 马拉爬犁 / 雪圈",
            "入住亚布力雪润茗家滑雪度假酒店"
        ],
        reminder: "年轻人专业雪场滑雪，长辈儿童访俄户体验",
        anchor: "#day3"
    },
    {
        date: new Date(2026, 11, 29),
        tag: "DAY 4｜雪乡童话夜",
        highlights: [
            "08:30 出发，亚布力 → 雪乡（约3小时车程）",
            "十里画廊 / 雪地摩托 / 梦幻家园",
            "晚上东北二人转 / 雪地蹦迪"
        ],
        reminder: "入住冰雪时光度假酒店（雪乡景区店）",
        anchor: "#day4"
    },
    {
        date: new Date(2026, 11, 30),
        tag: "DAY 5｜长途转移长白山",
        highlights: [
            "08:30 出发，雪乡 → 镜泊湖 → 长白山（约7-8小时车程）",
            "镜泊湖冰瀑 / 吊水楼瀑布",
            "入住长白山云居酒店（连住3晚）"
        ],
        reminder: "⚠️ 今日长途移动，准备颈枕、零食、保温杯",
        anchor: "#day5"
    },
    {
        date: new Date(2026, 11, 31),
        tag: "DAY 6｜长白山跨年夜",
        highlights: [
            "长白山北坡景区 / 天池（视天气开放）",
            "长白瀑布 / 绿渊潭 / 温泉蛋",
            "🎆 恩都里小镇 + 云顶市集跨年"
        ],
        reminder: "出发时间视景区天气开放通知调整，留意集合安排",
        anchor: "#day6"
    },
    {
        date: new Date(2027, 0, 1),
        tag: "DAY 7｜魔界漂流与温泉",
        highlights: [
            "09:00 出发，魔界不冻河漂流赏雾凇",
            "包车前往长白山户外火山温泉（约30分钟车程）",
            "下午自由活动，准备返程"
        ],
        reminder: "新年快乐！今天节奏比较轻松",
        anchor: "#day7"
    },
    {
        date: new Date(2027, 0, 2),
        tag: "DAY 8｜哈尔滨返程",
        highlights: [
            "早上长白山出发，高铁约4小时抵达哈尔滨",
            "东北虎林园 / 红肠大列巴采购（如时间允许）",
            "FM9066 HRB→PVG 20:15，FM877 PVG→PEN 01:50-07:30<span class=\"day-plus-one\">+1</span>"
        ],
        reminder: "⚠️ 白天时间紧凑，购物用餐请预留赴机场缓冲",
        anchor: "#day8"
    }
];

const tripStart = tripDays[0].date.getTime();
const tripEndFlight = new Date(2027, 0, 3, 7, 30, 0).getTime(); // PVG→PEN 落地时间，行程正式结束

function sameDay(a, b){
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

function findTodayIndex(now){
    return tripDays.findIndex(d => sameDay(d.date, now));
}

// ---- Hero 区块的倒计时/状态文字 ----
function renderHero(now, nowTime){
    const el = document.getElementById("heroCountdown");

    if(nowTime < tripStart){
        const distance = tripStart - nowTime;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        el.innerHTML = `⏳ <strong>${days}</strong> 天 ${hours} 时 ${minutes} 分`;
        return;
    }

    if(nowTime > tripEndFlight){
        el.innerHTML = "❄️ 旅程已结束";
        return;
    }

    const idx = findTodayIndex(now);
    if(idx >= 0){
        el.innerHTML = `🎉 旅程进行中 · Day ${idx + 1} / 8`;
    } else {
        el.innerHTML = "🎉 旅程进行中";
    }
}

// ---- 下方"今日行程"卡片：行程开始前留空，期间显示当天重点，结束后显示回顾 ----
function renderTodaySection(now, nowTime){
    const section = document.getElementById("todaySection");
    const title = document.getElementById("countdownTitle");
    const content = document.getElementById("todayContent");

    if(nowTime < tripStart){
        // 行程未开始，此区块留空不显示
        section.classList.add("hidden");
        content.innerHTML = "";
        return;
    }

    section.classList.remove("hidden");

    if(nowTime > tripEndFlight){
        title.innerHTML = "❄️ 旅程回顾";
        content.innerHTML = `
            <div class="today-block">
                <p class="today-reminder">本次东北跨年之旅已圆满结束，感谢一起度过这难忘的8天7夜 ❤️</p>
            </div>
        `;
        return;
    }

    const idx = findTodayIndex(now);
    const info = idx >= 0 ? tripDays[idx] : null;

    if(!info){
        section.classList.add("hidden");
        content.innerHTML = "";
        return;
    }

    title.innerHTML = "📍 今日行程";
    const highlightsHtml = info.highlights.map(h => `<li>${h}</li>`).join("");
    const dayNum = idx + 1;
    content.innerHTML = `
        <div class="today-block">
            <span class="tag today-tag">${info.tag}</span>
            <ul class="today-highlights">${highlightsHtml}</ul>
            <p class="today-reminder">${info.reminder}</p>
            <a class="today-link" href="${info.anchor}" onclick="event.preventDefault(); selectDay(${dayNum});">查看完整行程 →</a>
        </div>
    `;
}

function tick(){
    const now = new Date();
    const nowTime = now.getTime();
    renderHero(now, nowTime);
    renderTodaySection(now, nowTime);
}

tick();
setInterval(tick, 60000);

// ============================
// Daily Journey：点击 Day 导航只显示对应那一天
// ============================
function selectDay(n){
    if(n < 1 || n > tripDays.length) return;

    document.querySelectorAll('.day').forEach(d => d.classList.add('hidden'));
    const target = document.getElementById('day' + n);
    if(target) target.classList.remove('hidden');

    document.querySelectorAll('.day-nav a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector('.day-nav a[href="#day' + n + '"]');
    if(activeLink) activeLink.classList.add('active');

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.selectDay = selectDay;

function initDaySelector(){
    document.querySelectorAll('.day-nav a').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const n = parseInt(a.getAttribute('href').replace('#day', ''));
            selectDay(n);
        });
    });

    // 默认显示：行程进行中显示当天，否则显示 Day 1
    const now = new Date();
    const idx = findTodayIndex(now);
    selectDay(idx >= 0 ? idx + 1 : 1);
}

document.addEventListener('DOMContentLoaded', initDaySelector);

function goTop(){
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 返回顶部按钮：滚动一定距离后才显示
window.addEventListener("scroll", () => {
    const btn = document.getElementById("topBtn");
    if(!btn) return;
    btn.style.display = window.scrollY > 300 ? "block" : "none";
});

// 清单勾选状态本地保存
document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".checklist input[type=checkbox]");
    boxes.forEach((box, i) => {
        const key = "trip-checklist-" + i;
        const saved = localStorage.getItem(key);
        if(saved === "true"){
            box.checked = true;
        }
        box.addEventListener("change", () => {
            localStorage.setItem(key, box.checked);
        });
    });
});