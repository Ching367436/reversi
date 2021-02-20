---
title: Reversi
---

# [Play it!](https://ching367436.github.io/reversi/)

# 何謂黑白棋？
黑白棋為一種棋類遊戲

## 規則
> 棋盤共有8行8列共64格。開局時，棋盤正中央的4格先置放黑白相隔的4枚棋子（亦有求變化相鄰放置）。通常黑子先行。雙方輪流落子。只要落子和棋盤上任一枚己方的棋子在一條線上（橫、直、斜線皆可）夾著對方棋子，就能將對方的這些棋子轉變為我己方（翻面即可）。如果在任一位置落子都不能夾住對手的任一顆棋子，就要讓對手下子。當雙方皆不能下子時，遊戲就結束，子多的一方勝。
[维基百科](https://zh.wikipedia.org/wiki/%E9%BB%91%E7%99%BD%E6%A3%8B#%E9%81%8A%E6%88%B2%E8%A6%8F%E5%89%87)

![Reversi](./imgs/game.png)  


# 關於裡面的 AI

## random
隨機下

## Ching's Max ev1
使用的是封鎖對方行動力的策略，他會讓對手可下的棋步越來越少。

## Ching's Max ev2
喜歡佔領的 AI ，他會想讓自己的棋子越多越好。

## Ching's Max ev3
結合了以上兩個的優點，比以上兩個的棋力還強。

## Ching's Min ev3
策略與 `Ching's Max ev3` 相同， 只是最大化的是對手的利益


# [Play it!](https://ching367436.github.io/reversi/)