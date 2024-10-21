// import { TEstimate } from '@/types/estimate';
// import { formatNumberLocale } from './common';

export const adjustmentForm = (): string => {
  //   const now = new Date();
  //   const today = now.toLocaleDateString();
  //   const expirationDay = new Date(
  //     now.setDate(now.getDate() + 30),
  //   ).toLocaleDateString();
  //   const price =
  //     estimate.license === 'EDUCATION'
  //       ? 25000
  //       : estimate.periodType === 'YEAR'
  //         ? 50000
  //         : 60000;
  return `<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Reference Webpage</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700" rel="stylesheet">
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
        }
    </style>
</head>
<body class="bg-white">
    <div class="container mx-auto px-4 py-2">
        <div class="border-b-2 border-black py-4">
            <h1 class="text-3xl font-bold text-center">급여명세서</h1>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1 mt-8">
                <h2 class="text-xl font-bold mb-4">현황요약</h2>
                <table class="table-fixed w-full">
                    <tr class="border-b">
                        <th class="w-1/4 px-2 py-1">전월종균액</th>
                        <td class="w-3/4 px-2 py-1 text-right">4,671,915</td>
                    </tr>
                <!-- More rows here -->
                </table>
            </div>
            <!-- Similar div for the second column -->
        </div>

        <!-- Section for detailed lists with date, item and price etc. -->
        <div class="mt-8">
            <h2 class="text-xl font-bold">매출현황명세</h2>
            <table class="table-fixed w-full mt-4">
                <tr class="border-b">
                    <th class="w-1/6 px-2 py-1">취급일</th>
                    <th class="w-1/4 px-2 py-1">고객명</th>
                    <!-- More headings here -->
                </tr>
                <!-- Rows with data -->
            </table>
        </div>

        <!-- Section for another set of lists -->
        <!-- ... -->
        <div class="text-center mt-12">
            <p class="text-sm">위 금액은 부가가치세 별도금액임.</p>
            <p class="text-sm">2024년 7월 29일</p>
            <p class="text-sm mb-8">(주)명진 전기 사장 김민구</p>
        </div>
    </div>

    <!-- Footer content here -->
    <div class="text-center mt-12">
        <p class="border-t-2 border-black pt-4">주식회사 카트 대표 박근환</p>
    </div>
</body>
</html>`;
};
