import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import colors from "../constants/colors";
import URLs from "../constants/urls";
import Authentication from "../util/Authentication";
import Common from "../util/CommonUtils";
import { Icon } from "react-native-elements";

type overviewStates = {
    score: number
}

class ExpensesOverview extends React.Component<any, overviewStates> {
    constructor (props: any) {
        super(props);
        this.state = {
            score: 0
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

    async onPress(){

    }

    render () {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style = {styles.container2}>
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
                <TouchableOpacity>
                    <Icon name="piechart" color={colors.white} />
                </TouchableOpacity>
                </View>
            </View>
        );
    }
};

export default ExpensesOverview;

const styles = StyleSheet.create({
  container2: {
    flex: 3,
    backgroundColor: "rgb(210, 242, 249)",
    padding: 10,
  },
  rows: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgb(15, 94, 112)",
  },
});
