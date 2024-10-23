import { TAdjustment } from '@/types/adjustment';
import moment from 'moment';
import { numberFormat } from '../common';

export const adjustmentForm = (adjustment: TAdjustment): string => {
  return `<div style="margin: 0 auto; padding: 100px 50px; box-sizing: border-box; background: #fff;">
    <div style="text-align: center; font-size: 48px; font-weight: bold; padding-bottom: 40px; border-bottom: 2px solid #111;">급여명세서</div>

    <div style="display: flex; justify-content: space-between; margin-top: 50px;">
      <div style="width: 48%; display: flex; justify-content: center; gap: 50px;">
        <b style="margin: 5px 0; font-size: 48px; margin-top: 20px;">${adjustment?.name ?? '-'}</b>
        <div style="text-align: right;">
            <p style="margin: 5px 0; font-size: 24px;">영업팀</p>
            <p style="margin: 5px 0; font-size: 24px;">과장</p>
        </div>
      </div>
      <div style="width: 48%; text-align: right;">
        <div style="margin: 5px 0; margin-bottom: 30px; display: flex;
        justify-content: flex-end; gap: 30px;">
            <span style="font-size: 36px;">
                실수령액
            </span>
            <p style="font-size: 36px;">
            ${numberFormat(adjustment.salary)}
            </p>
        </div>
        <div style="margin: 5px 0; display: flex; justify-content: flex-end; gap: 30px;">
            <span style="color: #999; font-size: 24px;">
                매출합계
            </span>
            <p style="font-size: 24px; width: 20%;">
            ${numberFormat(adjustment.salary)}
            </p>
        </div>
        <div style="margin: 5px 0; display: flex; justify-content: flex-end; gap: 30px;">
            <span style="color: #999; font-size: 24px;">
                매출합계
            </span>
            <p style="font-size: 24px; width: 20%;">
            ${numberFormat(adjustment.salary)}
            </p>
        </div>
        <div style="margin: 5px 0; display: flex; justify-content: flex-end; gap: 30px;">
            <span style="color: #999; font-size: 24px;">
                지원합계
            </span>
            <p style="font-size: 24px; width: 20%;">
            ${numberFormat(adjustment.total_support)}
            </p>
        </div>
        <div style="margin: 5px 0; display: flex; justify-content: flex-end; gap: 30px;">
            <span style="color: #999; font-size: 24px;">
                정산합계
            </span>
            <p style="font-size: 24px; width: 20%;">
            ${numberFormat(adjustment.total_adjustment)}
            </p>
        </div>
        <div style="margin: 5px 0; display: flex; justify-content: flex-end; gap: 30px;">
            <span style="color: #999; font-size: 24px;">
                수당합계
            </span>
            <p style="font-size: 24px; width: 20%;">
            ${numberFormat(adjustment.total_allowance)}
            </p>
        </div>
        <div style="margin: 5px 0; display: flex; justify-content: flex-end; gap: 30px;">
            <span style="color: #999; font-size: 24px;">
                소득세
            </span>
            <p style="font-size: 24px; width: 20%;">
            ${numberFormat(adjustment.income_tax)}
            </p>
        </div>
      </div>
    </div>


    <div style="margin-bottom: 150px;">
      <h3 style="text-align: center; margin: 20px 0; font-weight: bold; font-size: 28px;">매출세부내역</h3>
        <div style="width: 100%; height: 1px; background-color: black; margin-bottom: 2px;"></div>
        <div style="width: 100%; height: 1px; background-color: black; margin-bottom: 20px;"></div>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="font-size: 24px; padding: 8px;">출고일</th>
            <th style="font-size: 24px; padding: 8px;">고객명</th>
            <th style="font-size: 24px; padding: 8px;">차종</th>
            <th style="font-size: 24px; padding: 8px;">차량금액</th>
            <th style="font-size: 24px; padding: 8px;">수수료</th>
            <th style="font-size: 24px; padding: 8px;">지원금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-size: 20px; padding: 8px;">7월 6일</td>
            <td style="font-size: 20px; padding: 8px;">임진영</td>
            <td style="font-size: 20px; padding: 8px;">카니발 HEV</td>
            <td style="font-size: 20px; padding: 8px;">48,850,000</td>
            <td style="font-size: 20px; padding: 8px;">5,373,500</td>
            <td style="font-size: 20px; padding: 8px;">-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3 style="text-align: center; margin: 20px 0; font-weight: bold;  font-size: 28px;">지원금세부내역</h3>
        <div style="width: 100%; height: 1px; background-color: black; margin-bottom: 2px;"></div>
        <div style="width: 100%; height: 1px; background-color: black; margin-bottom: 20px;"></div>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="font-size: 24px; padding: 8px;">출고일</th>
            <th style="font-size: 24px; padding: 8px;">고객명</th>
            <th style="font-size: 24px; padding: 8px;">내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-size: 20px; padding: 8px;">7월 6일</td>
            <td style="font-size: 20px; padding: 8px;">임진영</td>
            <td style="font-size: 20px; padding: 8px;">-</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="text-align: center; margin-top: 300px; display: flex; flex-direction: column; gap: 80px;">
        <div style="display: flex; flex-direction: column; gap: 30px;">
            <p style="font-size: 36px;">위 금액을 지불하였음을 증명함.</p>
            <p style="font-size: 36px;">${moment().format('YYYY년 MM월 DD일')}</p>
        </div>
      <p style="font-size: 36px;">귀하의 노고에 감사드립니다.</p>
      <b style="font-size: 48px;">주식회사 카트 대표 박근환</b>
    </div>
  </div>`;
};
