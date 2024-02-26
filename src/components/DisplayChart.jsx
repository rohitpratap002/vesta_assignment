import Chart from 'react-apexcharts'

const DisplayChart = ({category,series}) => {
    
    
    return (
        <Chart 
            options={{
                yaxis:{
                        min:0,
                        max:8,
                        tickAmount:5
                },
                title: {
                    text: 'Request per Hotel',
                    align: 'center'
                },
                chart:{
                    toolbar:{
                        show:false,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: category
                }
            }}
            series={[{
                name: "Requests",
                data: series,
            }]}
            type='line'
            height={"450px"}
            width={"100%"}
        />
    )
}

export default DisplayChart