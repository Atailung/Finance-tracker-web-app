import { StyleSheet } from "react-native";
import { COLORS } from "../../src/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row" as const,
        justifyContent: "space-between" as const,
        alignItems: "center" as const,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600" as const,
        color: COLORS.text,
    },
    backButton: {
        padding: 5,
    },
    saveButtonContainer: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        gap: 4,
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    saveButton: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "600" as const,
    },
    card: {
        backgroundColor: COLORS.card,
        margin: 16,
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    typeSelector: {
        flexDirection: "row" as const,
        marginBottom: 20,
        gap: 10,
    },
    typeButton: {
        flex: 1,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    typeButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    typeIcon: {
        marginRight: 8,
    },
    typeButtonText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "500" as const,
    },
    typeButtonTextActive: {
        color: COLORS.white,
    },
    amountContainer: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingBottom: 16,
        marginBottom: 20,
    },
    currencySymbol: {
        fontSize: 32,
        fontWeight: "bold" as const,
        color: COLORS.text,
        marginRight: 8,
    },
    amountInput: {
        flex: 1,
        fontSize: 36,
        fontWeight: "bold" as const,
        color: COLORS.text,
    },
    inputContainer: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
        backgroundColor: COLORS.white,
    },
    inputIcon: {
        marginHorizontal: 12,
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: COLORS.text,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600" as const,
        color: COLORS.text,
        marginBottom: 15,
        marginTop: 10,
        flexDirection: "row" as const,
        alignItems: "center" as const,
    },
    categoryGrid: {
        flexDirection: "row" as const,
        flexWrap: "wrap" as const,
        gap: 10,
    },
    categoryButton: {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
    },
    categoryButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryIcon: {
        marginRight: 6,
    },
    categoryButtonText: {
        color: COLORS.text,
        fontSize: 14,
    },
    categoryButtonTextActive: {
        color: COLORS.white,
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center" as const,
        justifyContent: "center" as const,
    },
});