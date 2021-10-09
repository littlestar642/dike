import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import colors from "../constants/colors";
import URLs from "../constants/urls";
import Authentication from "../util/Authentication";
import Common from "../util/CommonUtils";
import { Icon } from "react-native-elements";
import UserData from "../util/UserData";

type overviewStates = {
    score: number,
    debit: number,
    credit: number
}

class ExpensesOverview extends React.Component<any, overviewStates> {
    constructor (props: any) {
        super(props);
        let transactions = UserData.instance.transactions.reduce((arr, x) => {
            if (x.type === "DEBIT") {
                arr[0] += parseFloat(x.amount);
            } else {
                arr[1] += parseFloat(x.amount);
            }
            return arr;
        }, [0, 0]);
        this.state = {
            score: 0,
            debit: transactions[0],
            credit: transactions[1]
        };
    }

    componentDidMount () {
        this.getScore();
    }

    async getScore() {
        let headers = await Authentication.getAPIRequestHeader();
        let data = await Common.makeApiRequest('GET', URLs.getScore, headers);
        let score = JSON.parse(data).msg;
        this.setState(state => {
            return {
                ...state,
                score: score
            }
        });
    }


    render () {
        let date = new Date();
        return (
            <View style={{ flexDirection: "row" }}>
                <View style = {styles.container1}>
                    <AnimatedCircularProgress size={100} width={7} lineCap="round" rotation={225} backgroundWidth={2} fill={this.state.score}
                    tintColor={colors.white} backgroundColor={colors.gray} arcSweepAngle={270}>
                    { (fill) => (
                        <View style={{alignItems: "center"}}>
                            <Text style={{color: colors.white, fontSize: 12}}>Score</Text>
                            <Text style={{fontSize: 40, fontWeight: 'bold', color: colors.white}}>{this.state.score}</Text>
                        </View>
                    )}
                    </AnimatedCircularProgress>
                </View>
                <View style = {styles.container2}>
                    <Text style={{color: colors.white, fontSize: 14}}>Current Month Summary</Text>
                    <Text style={styles.label}>
                        Debit:
                    </Text>
                    <Text style={styles.amount}>
                        {this.state.debit}
                    </Text>
                    <Text style={styles.label}>
                        Credit:
                    </Text>
                    <Text style={styles.amount}>
                        {this.state.credit}
                    </Text>
                </View>
            </View>
        );
    }
};

export default ExpensesOverview;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        padding: 10,
    },
    container2: {
        flex:2,
        padding: 10,
        alignItems: "flex-end"
    },
    label: {
        color: colors.white,
        fontSize: 10
    },
    amount: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16
    }
});
