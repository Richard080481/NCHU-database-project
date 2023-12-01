<?php
// 获取前端通过 POST 请求发送的数据
$data = json_decode(file_get_contents('php://input'), true);

// 准备 SQL 语句插入数据（使用预处理语句防止 SQL 注入）
$date = $data['date'];
$title = $data['title'];

$stmt = $conn->prepare("INSERT INTO schedules (date, title) VALUES (?, ?)");
$stmt->bind_param("ss", $date, $title);

// 执行预处理语句
if ($stmt->execute()) {
    echo "Event saved successfully";
} else {
    echo "Error: " . $stmt->error;
}

// 关闭数据库连接
$stmt->close();
$conn->close();
?>