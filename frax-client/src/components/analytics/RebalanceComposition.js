import React from "react";
import "../../styles/analytics.css";
import { useContractReads } from "wagmi";
import { index, wfrxETH, frax, fxs, oracle, usdt } from "../../constants/contractAddress";
import { ERCToken_ABI } from "../../abis/ERCToken";
import {
  getfrxEtherPrice,
  getFraxPrice,
  getFxsPrice,
} from "../../services/geckoApi";
import { Pie, PieChart, Sector } from "recharts";
import { PriceOracleABI } from "../../abis/PriceOracle";



export default function RebalanceComposition() {
  const { data } = useContractReads({
    contracts: [
      {
        address: wfrxETH,
        abi: ERCToken_ABI,
        functionName: "balanceOf",
        args: [index],
      },
      {
        address: frax,
        abi: ERCToken_ABI,
        functionName: "balanceOf",
        args: [index],
      },
      {
        address: fxs,
        abi: ERCToken_ABI,
        functionName: "balanceOf",
        args: [index],
      },
      {
        address: oracle,
        abi: PriceOracleABI,
        functionName: "getPrice",
        args: [wfrxETH, usdt]
      },
      {
        address: oracle,
        abi: PriceOracleABI,
        functionName: "getPrice",
        args: [frax, usdt]
      },
      {
        address: oracle,
        abi: PriceOracleABI,
        functionName: "getPrice",
        args: [fxs, usdt]
      },
    ],
  });
  const [wfrxETHPrice, setwfrxETHPrice] = React.useState(data ? data[3]/10**8 : "3378.56");
  const [fraxPrice, setFraxPrice] = React.useState(data ? data[4]/10**8 : "1.01");
  const [fxsPrice, setFxsPrice] = React.useState(data ? data[5]/10**8 : "3.56");

  const [wfrxETHValue, setwfrxETHValue] = React.useState("1470796.86");
  const [fraxValue, setFraxValue] = React.useState("1784247.36");
  const [fxsValue, setFxsValue] = React.useState("1200806.12");

  const [wfrxETHAllocation, setwfrxETHAllocation] = React.useState("32");
  const [fraxAllocation, setFraxAllocation] = React.useState("39");
  const [fxsAllocation, setFxsAllocation] = React.useState("29");

  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = React.useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // console.log("INDEX CONTRACT BALANCE: ", Number(data[0]), Number(data[1]))
  const assetData = [
    {
      name: "wFrax Ether",
      symbol: "wfrxETH",
      balance: data ? Number(data[0]) / 10 ** 18 : "0.001",
      price: wfrxETHPrice,
      change24H: "+9.6",
      value: wfrxETHValue,
      allocation: wfrxETHAllocation,
    },
    {
      name: "Frax",
      symbol: "FRAX",
      balance: data ? Number(data[1]) / 10 ** 18 : "3.25",
      price: fraxPrice,
      change24H: "+9.6",
      value: fraxValue,
      allocation: fraxAllocation,
    },
    {
      name: "Frax Share",
      symbol: "FXS",
      balance: data ? Number(data[2]) / 10 ** 18 : "1.08",
      price: fxsPrice,
      change24H: "+9.6",
      value: fxsValue,
      allocation: fxsAllocation,
    },
  ];

  React.useEffect(() => {
    setPrices();
  }, []);
  async function setPrices() {
    try {
      //   const btcprice = await getBitcoinPrice();
      //   const ethprice = await getEthereumPrice();
      //   const usdtprice = await getTetherPrice();
      const frxETHprice = await getfrxEtherPrice();
      const fraxprice = await getFraxPrice();
      const fxsprice = await getFxsPrice();
      setwfrxETHPrice(frxETHprice);
      setFraxPrice(fraxprice);
      setFxsPrice(fxsprice);
      if (data) {
        const wfrxETH_value = (Number(data[0]) / 10 ** 18) * frxETHprice;
        const frax_value = (Number(data[1]) / 10 ** 18) * fraxprice;
        const fxs_value = (Number(data[2]) / 10 ** 18) * fxsprice;
        const total_value = wfrxETH_value + frax_value + fxs_value;
        setwfrxETHValue(wfrxETH_value);
        setFraxValue(frax_value);
        setFxsValue(fxs_value);
        setwfrxETHAllocation((wfrxETH_value * 100) / total_value);
        setFraxAllocation((frax_value * 100) / total_value);
        setFxsAllocation((fxs_value * 100) / total_value);
      }
    } catch (error) {
      console.log("Error setting data:", error);
      setwfrxETHPrice("64034.56");
      setFraxPrice("4765.83");
      setFxsPrice("1.001");
      setwfrxETHValue("1470796.86");
      setFraxValue("1784247.36");
      setFxsValue("1200806.12");
      setwfrxETHAllocation("31.3");
      setFraxAllocation("38.6");
      setFxsAllocation("28.1");
    }
  }

  return (
    <div style={{ marginBlock: "10%" }}>
      <h1 style={{ marginBlock: "1%" }}>Token Holdings</h1>
      <div className="wide-apart-row composition-heading">
        {/* //Title */}
        <p>ASSET</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "70%",
            justifyContent: "space-evenly",
          }}
        >
          <p className="element-box">BALANCE</p>
          <p className="element-box">PRICE</p>
          {/* <p className="element-box">CHANGE 24H</p> */}
          <p className="element-box">VALUE</p>
          <p className="element-box">ALLOCATION</p>
        </div>
      </div>

      {/* Assets */}
      {data &&
        assetData.map((asset, index) => (
          <div key={index} className="wide-apart-row composition-row">
            <p style={{ fontWeight: "700" }}>{asset.name}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "70%",
                justifyContent: "space-evenly",
              }}
            >
              <p className="element-box">
                {Number(asset.balance).toLocaleString()} ({asset.symbol})
              </p>
              <p className="element-box">
                $ {Number(asset.price).toLocaleString()}
              </p>
              {/* <p className="element-box">{asset.change24H} %</p> */}
              <p className="element-box">
                $ {Number(asset.value).toLocaleString()}
              </p>
              <p className="element-box">
                {Number(asset.allocation).toLocaleString()} %
              </p>
            </div>
          </div>
        ))}

      <PieChart width={800} height={300}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={assetData}
          cx={400}
          cy={150}
          innerRadius={50}
          outerRadius={80}
          fill="#52BAD1"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </div>
  );
}


// const testData = [
//     { name: "wfrxETH", value: 400 },
//     { name: "FRAX", value: 300 },
//     { name: "FXS", value: 300 },
//   ];
  
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <text x={cx} y={cy+16} dy={6} textAnchor="middle" fill={fill}>
          {Number(payload.balance).toLocaleString()}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#999"
        >{`$ ${Number(value).toLocaleString()}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Allocation ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };