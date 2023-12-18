# NCHU-database-project

## 2023/12/18
- 修復search bar功能
- 修改darkmode button size
- 修改darkmode-ignore的z-index

## 2023/12/14
- 調整JS載入順序

## 2023/12/13
- 微調顯示z-index數值
- 刪除每日重複事件
- 重複事件顯示
- 更新資料庫(請匯入)

## 2023/12/13
- 完成夜間模式
- 顯示tag預設值與設定值

## 2023/12/12
- 修改EventDiv color
- 顯示Event tag name to EventDiv
- 顯示event點點顏色
- 夜間模式實現

## 2023/12/10
- 修正Tag傳入值
- 新增夜間模式按鈕及切換icon

## 2023/12/10
- 將事件按照順序排列
- 多天事件 bug修正
- 日期未滿2位應自動補0 bug修正

## 2023/12/7
- 將調色盤調整為可編輯
- 將編輯過後的TagName儲存到資料庫中
- 新增color_tag表格(記得匯入)
- color_tag adding trigger when the userAccount is created

## 2023/12/06
- 點擊事件可以修改
- 刪除事件
- 未選擇日期時，點新增事件預設為今日
- 重複週期數字可以回傳至資料庫
- 雙擊日期可以開啟新增事件(目前應該只有當月)

## 2023/11/29
- 微調logIn button大小與樣式
- logIn button旁邊空白可以關閉視窗
- 設定重複日期的拉桿並且開啟時預設為關
- 新增color picker(待合併風格)

- 修改登入機制
    - 正確登入後才可跳轉到index.html
    - 使用cookie保持登入
- 調整資料庫，將使用者登入帳號改成mail
- 調整日曆計算月份Bug


## 2023/11/28
- 登入後可載入資料庫事件
- 按下日期按鈕可切換鎖定日期

## 2023/11/27
- 點擊新增頁面旁邊空白可以關閉視窗
- 加入空白頁面setting，timer, home, calendar頁面連結
- 增加新增事件按鈕（功能未實做）
- 微調新增事件頁面

## 2023/11/26
- 增加回到今日的按鈕

## 2023/11/25
- 將月曆搬進網頁內
- 微調月曆JS、CSS

## 2023/11/22
- 確認sql table可讀取
- 修改檔案結構(移除舊版月曆) 將網頁從index2 改為index index改為參考檔案
- 更新資料庫表格
- 整理資料夾
- 實踐log in、sign up
  
  
## 2023/11/21
- 新增資料庫
- 新增allevents、user、class表格
- 修改calender增加事件選單
