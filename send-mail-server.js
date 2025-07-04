const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 用你自己的邮箱和授权码
const transporter = nodemailer.createTransport({
  service: 'qq', // 也可以是 '163', 'gmail' 等
  auth: {
    user: '你的邮箱@qq.com',      // 换成你的邮箱
    pass: '你的授权码'            // 换成你的邮箱授权码（不是邮箱密码！）
  }
});

app.post('/api/send-welcome-email', async (req, res) => {
  const { email, username } = req.body;
  try {
    await transporter.sendMail({
      from: 'AIoT健康 <你的邮箱@qq.com>', // 换成你的邮箱
      to: email,
      subject: '欢迎加入AIoT健康监测平台',
      html: `<p>亲爱的${username || '用户'}，您好！<br>欢迎注册并使用我们的AIoT健康监测平台。我们将为您提供个性化的健康数据分析与建议，祝您健康每一天！<br>—— AIoT健康团队</p>`
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, () => console.log('邮件服务已启动，端口3001')); 